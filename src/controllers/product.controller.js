import { productRepository } from "../repository/index.js";

class ProductController {
  async addProduct(req, res) {
    const { title, description, price, thumbnail, code, stock, category } = req.body;

    try {
      let product = await productRepository.create({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
      });
      res.status(200).json({
        result: "Success",
        message: product,
      });
    } catch (error) {
      res.status(500).json({
        result: "Error create product",
        message: error.message,
      });
    }
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    let { title, description, price, status, thumbnail, code, stock, category } = req.body;

    status = stock > 0;

    try {
      const product = await productRepository.update(id, {
        title,
        description,
        price,
        status,
        thumbnail,
        code,
        stock,
        category,
      });
      if (!product)
        return res
          .status(404)
          .json({ result: "Error updating product", message: "Product not found" });

      res.status(200).json({ result: "Success", message: product });
    } catch (error) {
      res.status(500).json({ result: "Error updating product", message: error });
    }
  }

  async getAll(req, res) {
    try {
      const allProducts = await productRepository.getAll();
      res.status(200).json({ result: "Success", message: allProducts });
    } catch (error) {
      res.status(500).json({ result: "Error getting products", message: error });
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const product = await productRepository.getById(id);
      if (!product)
        return res
          .status(404)
          .json({ result: "Error getting product", message: "Product not found" });
      res.status(200).json({ result: "Success", message: product });
    } catch (error) {
      res.status(500).json({ result: "Error getting product", message: error });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await productRepository.delete(id);
      if (!product)
        return res
          .status(404)
          .json({ result: "Error deleting product", message: "Product not found" });
      res.status(200).json({ result: "Success", message: product });
    } catch (error) {
      res.status(500).json({ result: "Error deleting product", message: error });
    }
  }

  async paginate(req, res) {
    const { limit, page, sort, category, available } = req.query;

    let queries = {};

    try {
      if (page) {
        const pageNumber = parseInt(page);
        if (isNaN(pageNumber) || pageNumber <= 0) {
          return res.status(400).send({ response: "Error", message: "Invalid page number" });
        }
      }

      let options = {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
      };

      if (category) {
        queries.category = category;
      }

      if (available === "true") {
        queries.stock = { $gt: 0 };
      } else if (available === "false") {
        queries.stock = 0;
      }

      if (sort === "asc") {
        options.sort = { price: 1 };
      } else if (sort === "desc") {
        options.sort = { price: -1 };
      }

      const products = await productRepository.paginate(queries, options);

      if (parseInt(page) > products.totalPages) {
        return res.status(400).send({ response: "Error", message: "Page does not exist" });
      }

      const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
      const prevLink = products.hasPrevPage
        ? baseUrl.replace(`page=${products.page}`, `page=${products.prevPage}`)
        : null;
      const nextLink = products.hasNextPage
        ? baseUrl.replace(`page=${products.page}`, `page=${products.nextPage}`)
        : null;

      const response = {
        status: "Success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: prevLink,
        nextLink: nextLink,
      };
      res.status(200).send({ response: "ok", message: response });
    } catch (error) {
      res.status(400).send({
        response: "Error read db",
        message: error,
      });
    }
  }
}

export const productController = new ProductController();
