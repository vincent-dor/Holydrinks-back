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
  ('Mojito', 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Mojito_003.jpg', 'Librement inspiré du Mint Julep (cocktail à base de whisky), le Mojito ou Drake (nom légendaire préféré par les anglo saxons) est un cocktail qui fleure bon la Havane.', 1, 1),
  ('Amaretto Sunrise', 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Tequila_Sunrise.jpg', 'L’Amaretto Sunrise est un cocktail coloré à base d’amaretto (liqueur italienne), de grenadine et de jus d’orange, servi sur glaçons frais, doit être dégusté frais et idéalement les pieds dans l’eau. Avec cette recette vous étonnerez vos amis lors de vos soirées barbecue/piscine.', 1, 1),
  ('Cuba Libra', 'https://upload.wikimedia.org/wikipedia/commons/b/b7/CubaLibre_front001x.jpg', 'Le Cuba libre ou rhum-Coca,, ou rum and Coke (aux États-Unis et au Canada anglophone et francophone) ou Cuba au Mexique est un cocktail à base de rhum, de citron vert et de cola.', 1, 1),
  ('Kir Royal', 'https://upload.wikimedia.org/wikipedia/commons/a/a4/15-09-26-RalfR-WLC-0299.jpg', 'Le kir Royal à savourer!', 3, 1),
  ('Punch de Noël', 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Southern_Bourbon_Punch.jpg', 'Rien de plus convivial qu’un punch ou chacun peut se servir quand il le souhaite pour les fêtes de fin d’année. Cette recette de punch de noël pleine de saveurs et très colorée va égayer votre table.', 2, 1),
  ('Halloween punch', 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Yummy_punch_made_by_moi_%28185709223%29.jpg', 'Que ce soit le soir d’Halloween ou pour une soirée lugubre entre amis ou avec des proches, je vous propose de découvrir la recette Halloween Punch dont la composition terrifiante ne laissera pas vos invités insensible.', 2, 1);

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
  ('Crème de cassis'),
  ('Amaretto'),
  ('Grenadine'),
  ('Orange pressé'),
  ('Coca cola'),
  ('Rhum brun'),
  ('Sucre brun'),
  ('Ananas'),
  ('Vanille'),
  ('Jus de raisin'),
  ('Sorbet orange'),
  ('Sorbet citron');

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
  (5, 4),
  (6, 4),
  (7, 4),
  (8, 2),
  (9, 2),
  (10, 2),
  (11, 3),
  (12, 3),
  (4, 3),
  (4, 5),
  (5, 5),
  (10, 5),
  (13, 5),
  (14, 5),
  (15, 5),
  (16, 6),
  (17, 6),
  (18, 6),
  (2, 6);