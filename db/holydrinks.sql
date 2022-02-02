DROP TABLE IF EXISTS `lists`;
DROP TABLE IF EXISTS `ingredients`;
DROP TABLE IF EXISTS `cocktails`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(200) NOT NULL,
  `lastname` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `password` VARCHAR(355) NOT NULL,
  `city` VARCHAR(200) NOT NULL,
  `isAdmin` BOOLEAN NOT NULL
);

INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`,`city`, `isAdmin`) 
VALUES 
  ('Admin','Admin', 'admin@holydrinks.fr', '$argon2i$v=19$m=4096,t=3,p=1$gW57PbhDhQ1yiBq7bg9bfQ$Y8NV9mpA2LoVZo0B1PhlDZ85kKgkFnUlOA3aEO1lIjQ', 'Paris', true),
  ('User', 'User', 'user@holydrinks.fr', '$argon2i$v=19$m=4096,t=3,p=1$gW57PbhDhQ1yiBq7bg9bfQ$Y8NV9mpA2LoVZo0B1PhlDZ85kKgkFnUlOA3aEO1lIjQ', 'Nantes', false);

CREATE TABLE `categories` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL
);

INSERT INTO `categories`(`name`) 
VALUES 
  ('Classique'),
  ('Punch'),
  ('Kir'),
  ('Shot'),
  ('Autre');

CREATE TABLE `cocktails` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `image` VARCHAR(200) NOT NULL,
  `description` VARCHAR(355) NOT NULL,
  `categoryId` INT NOT NULL,
  `userId` INT NOT NULL,
  FOREIGN KEY (categoryId) REFERENCES categories(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

INSERT INTO `cocktails` (`name`, `image`, `description`, `categoryId`, `userId`) 
VALUES 
  ('Mojito', 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Mojito_003.jpg', 'Le mojito simple à savourer!', 1, 1),
  ('Kir Royal', 'https://upload.wikimedia.org/wikipedia/commons/a/a4/15-09-26-RalfR-WLC-0299.jpg', 'Le kir Royal à savourer!', 3, 1);

CREATE TABLE `ingredients` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL
);

INSERT INTO `ingredients`(`name`) 
VALUES 
  ('Menthe'),
  ('Eau pétillante'),
  ('Sucre'),
  ('Citron vert'),
  ('Rhum blanc'),
  ('Champagne'),
  ('Crème de cassis');

CREATE TABLE `lists` (
  `ingredientId` INT NOT NULL,
  `cocktailId` INT NOT NULL,
  FOREIGN KEY (ingredientId) REFERENCES ingredients(id),
  FOREIGN KEY (cocktailId) REFERENCES cocktails(id)
);

INSERT INTO `lists`(`ingredientId`, `cocktailId`) 
VALUES 
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 1),
  (5, 2),
  (6, 2),
  (7, 2);