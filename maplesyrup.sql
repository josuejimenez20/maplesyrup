-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-05-2023 a las 15:15:55
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `maplesyrup`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments_of_products`
--

CREATE TABLE `comments_of_products` (
  `id_comment_of_product` int(50) NOT NULL,
  `id_user` int(50) NOT NULL,
  `id_product` int(50) NOT NULL,
  `comment` varchar(500) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `directions`
--

CREATE TABLE `directions` (
  `id_direction` int(30) NOT NULL,
  `id_user` int(30) NOT NULL,
  `id_user_encrypted` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `country` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `state` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `city` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `postal_code` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `suburb` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `street` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `first_heighboring_street` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `second_heighboring_street` varchar(50) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `directions`
--

INSERT INTO `directions` (`id_direction`, `id_user`, `id_user_encrypted`, `country`, `state`, `city`, `postal_code`, `suburb`, `street`, `first_heighboring_street`, `second_heighboring_street`) VALUES
(18, 18, '950e6631-b174-421c-a6d2-c509a9248035', 'Mexico', 'Campeche', 'Emiliano Zapata', '34432', 'Morelos ', '16 de septiembre', 'Allende', 'Guerrero'),
(19, 19, 'fc96a544-1997-46bf-9b40-5fee01337296', 'Mexico', 'fsdfsd', 'fsdsdf', '432432', 'fsdfds', 'fdsfsd', 'fsdfsd', 'fsdfdsfsd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id_product` int(50) NOT NULL,
  `name` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `count` int(50) NOT NULL,
  `price` float NOT NULL,
  `typeProduct` varchar(40) COLLATE utf8_spanish2_ci NOT NULL,
  `path_image` longtext COLLATE utf8_spanish2_ci NOT NULL,
  `date_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id_product`, `name`, `count`, `price`, `typeProduct`, `path_image`, `date_created`) VALUES
(2, 'Collar de Corazon', 3, 46, 'collar', 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665537804/ldx5h587jsowbobwbriu.jpg', '2022-10-11'),
(3, 'Anillo de Mariposa', 5, 26, 'anillo', 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665537888/axopzrz6ebjmlzcxi3n4.jpg', '2022-10-12'),
(4, 'Luz de tira', 1, 80, 'varias', 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665574003/fmvbdyilth9inwxfrm4g.jpg', '2022-10-12'),
(5, 'Luz noccturna diseño de velas', 9, 25, 'decoracion', 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665574014/k8iawjgxzrodyoue4zxy.jpg', '2022-10-12'),
(7, 'Collar de llave', 3, 50, 'collar', 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665574147/p2lbttjvtumkwdbu0i8l.jpg', '2022-10-12'),
(8, 'Cuernos', 2, 50, 'broches', 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665574255/jxgste9txps7dyf6y6nc.jpg', '2022-10-12'),
(9, 'Orejitas de gato', 3, 30, 'cabello', 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665574296/cgofol6oaum5nhg5uizh.jpg', '2022-10-12'),
(10, 'Cuernos', 1, 30, 'cabello', 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665574318/yucwa8qkkwxb92wn7zll.jpg', '2022-10-12'),
(11, 'Broches alas de murcielago ', 1, 35, 'broches', 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665574350/akua05hxh7a8u9jbctfc.jpg', '2022-10-12'),
(12, 'Cuernos', 2, 50, 'cabello', 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665574428/bq1akkzdmk60h9amjnbm.jpg', '2022-10-12'),
(13, 'Broches de murcielago', 1, 35, 'cabello', 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665574558/mwdgso3u4udvugjvvcya.jpg', '2022-10-12'),
(14, 'Collar de llave', 1, 35, 'collar', 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665578360/v4bamtmwn1qywtvhkshk.jpg', '2022-10-12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_information`
--

CREATE TABLE `product_information` (
  `id_product_information` int(50) NOT NULL,
  `id_product` int(50) NOT NULL,
  `in_offer` int(20) NOT NULL,
  `number_sales` int(50) NOT NULL,
  `likes` int(50) NOT NULL,
  `dislike` int(50) NOT NULL,
  `paths_images` varchar(500) COLLATE utf8_spanish2_ci NOT NULL,
  `description` varchar(200) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `product_information`
--

INSERT INTO `product_information` (`id_product_information`, `id_product`, `in_offer`, `number_sales`, `likes`, `dislike`, `paths_images`, `description`) VALUES
(1, 2, 1, 5, 4, 1, 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665537804/ldx5h587jsowbobwbriu.jpg', 'Hermoso corazon de collar 20cm de largo'),
(2, 3, 1, 3, 2, 0, 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665537888/axopzrz6ebjmlzcxi3n4.jpg', 'Hermoso anillo de mariposa color plata'),
(3, 4, 1, 10, 5, 4, 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665574003/fmvbdyilth9inwxfrm4g.jpg', 'Tira de figuras de calabazas para dia de muertos'),
(4, 5, 1, 1, 1, 0, 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665574014/k8iawjgxzrodyoue4zxy.jpg', 'Luz nocturna para tu habbitacion '),
(5, 7, 0, 5, 0, 0, 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665574147/p2lbttjvtumkwdbu0i8l.jpg', 'Hermoso collar para abrir el corazon'),
(6, 8, 0, 3, 2, 1, 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665574147/p2lbttjvtumkwdbu0i8l.jpg', 'Cuertos para el cabello'),
(7, 9, 1, 0, 0, 0, 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665574147/p2lbttjvtumkwdbu0i8l.jpg', 'Orejas para el cabello'),
(8, 10, 1, 6, 3, 3, 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665574318/yucwa8qkkwxb92wn7zll.jpg', 'Cuernos para cabello'),
(9, 11, 0, 12, 10, 2, 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665574318/yucwa8qkkwxb92wn7zll.jpg', 'Broches para el cabello'),
(10, 12, 0, 14, 3, 4, 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665574318/yucwa8qkkwxb92wn7zll.jpg', 'Cuernos para cabello'),
(11, 13, 1, 15, 5, 5, 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665574318/yucwa8qkkwxb92wn7zll.jpg', 'Hermoso para tu cabbello'),
(12, 14, 1, 0, 0, 0, 'https://res.cloudinary.com/dfcowl76a/image/upload/v1665578360/v4bamtmwn1qywtvhkshk.jpg', 'Collar para abbrir el corazon');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(20) NOT NULL,
  `id_user_encrypted` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `names` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `second_last_name` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `password` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `telephone` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `gender` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `birth_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `id_user_encrypted`, `names`, `last_name`, `second_last_name`, `email`, `password`, `telephone`, `gender`, `birth_date`) VALUES
(18, '950e6631-b174-421c-a6d2-c509a9248035', 'Dani', 'Garcia', 'Guitierrez', 'dani@gmail.com', '123', '432432423', 'Femenino', '2003-03-03'),
(19, 'fc96a544-1997-46bf-9b40-5fee01337296', 'Pablo', 'P', 'p', 'fsdfd@gmail.com', '123', '234324', 'Masculino', '2022-10-26');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comments_of_products`
--
ALTER TABLE `comments_of_products`
  ADD PRIMARY KEY (`id_comment_of_product`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_product` (`id_product`);

--
-- Indices de la tabla `directions`
--
ALTER TABLE `directions`
  ADD PRIMARY KEY (`id_direction`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`);

--
-- Indices de la tabla `product_information`
--
ALTER TABLE `product_information`
  ADD PRIMARY KEY (`id_product_information`),
  ADD KEY `id_product` (`id_product`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comments_of_products`
--
ALTER TABLE `comments_of_products`
  MODIFY `id_comment_of_product` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `directions`
--
ALTER TABLE `directions`
  MODIFY `id_direction` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `product_information`
--
ALTER TABLE `product_information`
  MODIFY `id_product_information` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments_of_products`
--
ALTER TABLE `comments_of_products`
  ADD CONSTRAINT `comments_of_products_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `comments_of_products_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`);

--
-- Filtros para la tabla `directions`
--
ALTER TABLE `directions`
  ADD CONSTRAINT `directions_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Filtros para la tabla `product_information`
--
ALTER TABLE `product_information`
  ADD CONSTRAINT `product_information_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`),
  ADD CONSTRAINT `product_information_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
