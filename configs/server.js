"use strict";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import publicationRoutes from '../src/publication/publication.routes.js';
import commentRoutes from '../src/comentario/comment.routes.js'

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.publicationPath = '/blog/v1/publication';
    this.commentPath = '/blog/v1/comment';

    this.middlewares();
    this.conectDB();
    this.routes();
  }

  async conectDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.publicationPath, publicationRoutes);
    this.app.use(this.commentPath, commentRoutes);
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port ", this.port);
    });
  }
}

export default Server;