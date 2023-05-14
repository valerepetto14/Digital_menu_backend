USE digital_menu;

INSERT INTO categories (id, title, createdAt, updatedAt) VALUES
/* Categories */

('7dab8b4c-7d77-4522-8b85-8bba9d1d4ef4', 'Starters', current_timestamp(), current_timestamp()),
('53d55cc1-829f-45bf-b2ec-9dd649f89f45', 'Mains', current_timestamp(), current_timestamp()),
('97d3e810-5d5c-4cda-9945-078cf5f5d200', 'Desserts', current_timestamp(), current_timestamp()),
('fe72a885-0ef2-4371-a120-7e520f531663', 'Drinks', current_timestamp(), current_timestamp());

/*Sub-Categories*/

INSERT INTO subCategories (id, title, categoryId, createdAt, updatedAt) VALUES
('d9709511-9a7a-4c4c-a7c4-2a3c6f559aea', 'Pizzas', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', current_timestamp(), current_timestamp()),
('67a01d7a-3811-4fb1-aa8f-ebc7e415f10d', 'Meats', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', current_timestamp(), current_timestamp()),
('35239f4a-03f4-4d04-9371-2eb1b388dd8f', 'Tacos', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', current_timestamp(), current_timestamp()),
('d8fa6e0d-4a4f-4e30-8f6b-9b1f45295af4', 'Soups', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', current_timestamp(), current_timestamp()),
('6d3d3e2f-044c-4c19-832d-0d1a8ccf9c52', 'Salads', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', current_timestamp(), current_timestamp()),
('11fcf6e5-6e5b-4c24-a0cf-f6cb74c6d2b8', 'Hamburguers', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', current_timestamp(), current_timestamp()),
('c95e9015-14ad-4f4d-9b4c-63ebdc7e15aa', 'Pastas', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', current_timestamp(), current_timestamp()),
('3fb473e8-475f-4224-b9c0-21888060d2ad', 'Snacks', '7dab8b4c-7d77-4522-8b85-8bba9d1d4ef4', current_timestamp(), current_timestamp()),
('123e4567-e89b-12d3-a456-426655440002', 'Non-Alcoholic Drinks', 'fe72a885-0ef2-4371-a120-7e520f531663', current_timestamp(), current_timestamp()),
('b9e4e4c1-14d7-47b9-8349-0bfae3b93442', 'Alcoholic Drinks', 'fe72a885-0ef2-4371-a120-7e520f531663', current_timestamp(), current_timestamp()),
('4d8c0b1b-eb67-4f5e-8ab1-3e9585b49aae', 'Cakes', '97d3e810-5d5c-4cda-9945-078cf5f5d200', current_timestamp(), current_timestamp());


/* -------------------------------------------------------------------------------------------------------------------------------------- */


INSERT INTO products (id, name, description, currentPrice, status, available, image, categoryId, subCategoryId, createdAt, updatedAt) VALUES	
	
    /* <| Starters |> */
('d1056e38-f80e-4a70-a1e2-2f97d1cfe251', 'Caprese Salad', 'Fresh tomatoes, basil, and mozzarella cheese drizzled with balsamic glaze.', '8.99', true, true, 'https://example.com/caprese.jpg', '7dab8b4c-7d77-4522-8b85-8bba9d1d4ef4', '3fb473e8-475f-4224-b9c0-21888060d2ad', current_timestamp(), current_timestamp()),
('e4e4dfdd-b7b4-4dc2-b2cf-496ebca9e1d4', 'Stuffed Mushrooms', 'Mushroom caps stuffed with a mixture of cream cheese, parmesan cheese, and garlic.', '7.99', true, true, 'https://example.com/mushrooms.jpg', '7dab8b4c-7d77-4522-8b85-8bba9d1d4ef4', '3fb473e8-475f-4224-b9c0-21888060d2ad', current_timestamp(), current_timestamp()),
('5c3e3e6b-9a53-4d72-b463-2bb87a1a0bca', 'Bruschetta', 'Toasted bread topped with chopped tomatoes, garlic, and basil.', '6.99', true, true, 'https://example.com/bruschetta.jpg', '7dab8b4c-7d77-4522-8b85-8bba9d1d4ef4', '3fb473e8-475f-4224-b9c0-21888060d2ad', current_timestamp(), current_timestamp()),
('e5a6a3ee-53f1-44e3-9d1b-65e28bbff8eb', 'Spinach and Artichoke Dip', 'Warm and creamy dip made with spinach, artichokes, and parmesan cheese.', '8.99', true, true, 'https://example.com/spinach-artichoke.jpg', '7dab8b4c-7d77-4522-8b85-8bba9d1d4ef4', '3fb473e8-475f-4224-b9c0-21888060d2ad', current_timestamp(), current_timestamp()),
('c8470f78-d7dc-4b07-aeaf-0d87f79b73aa', 'Fried Calamari', 'Crispy fried calamari served with marinara sauce and lemon wedges.', '9.99', true, true, 'https://example.com/calamari.jpg', '7dab8b4c-7d77-4522-8b85-8bba9d1d4ef4', '3fb473e8-475f-4224-b9c0-21888060d2ad', current_timestamp(), current_timestamp()),
	
    /* <| Mains |> */
/* Pizzas */

('2b75f620-11f9-47df-8e64-3257e5c5d5e5', 'Margherita Pizza', 'A simple pizza made with tomato sauce, fresh mozzarella cheese, and basil', '12.99', true, true, 'https://example.com/margherita-pizza.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', 'd9709511-9a7a-4c4c-a7c4-2a3c6f559aea', current_timestamp(), current_timestamp()),
('f4de4e99-70b4-4f39-b93b-c6169981a22c', 'Meat Lovers Pizza', 'A pizza loaded with tomato sauce, mozzarella cheese, pepperoni, sausage, bacon, and ham.', '17.99', true, true, 'https://example.com/meat-lovers.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', 'd9709511-9a7a-4c4c-a7c4-2a3c6f559aea', current_timestamp(), current_timestamp()),
('3b30a0b8-5356-4152-9f02-133946fe9f18', 'Veggie Pizza', 'A pizza with tomato sauce, mozzarella cheese, bell peppers, onions, mushrooms, and olives.', '14.99', true, true, 'https://example.com/veggie.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', 'd9709511-9a7a-4c4c-a7c4-2a3c6f559aea', current_timestamp(), current_timestamp()),
('e6110c02-4656-4ec1-9b9d-d4cc14cbce4e', 'White Pizza', 'A pizza with olive oil, garlic, mozzarella cheese, ricotta cheese, and spinach.', '12.99', true, true, 'https://example.com/white.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', 'd9709511-9a7a-4c4c-a7c4-2a3c6f559aea', current_timestamp(), current_timestamp()),
('ec771bfa-38b8-4b6d-a546-cfb7369a9b7e', 'BBQ Pork Pizza', 'A pizza with BBQ sauce, mozzarella cheese, pulled pork, and red onions.', '15.99', true, true, 'https://example.com/bbq-pork.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', 'd9709511-9a7a-4c4c-a7c4-2a3c6f559aea', current_timestamp(), current_timestamp()),

/* Meats */

('1c8e842d-7a63-4323-9c2d-d2a1166b505e', 'Beef Sirloin Steak', 'Premium cut of beef sirloin steak, tender and juicy', '15.99', true, true, 'https://example.com/beef_sirloin_steak.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '67a01d7a-3811-4fb1-aa8f-ebc7e415f10d', current_timestamp(), current_timestamp()),
('335f1848-9327-4b5a-8a83-832f3b1f1215', 'Grilled Chicken Breast', 'Marinated grilled chicken breast, tender and flavorful', '12.99', true, true, 'https://example.com/grilled_chicken_breast.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '67a01d7a-3811-4fb1-aa8f-ebc7e415f10d', current_timestamp(), current_timestamp()),
('3cf8a82d-0b63-48b7-a82b-d6e79c6e59b6', 'Pork Ribs', 'Slow-cooked pork ribs, tender and juicy', '16.99', true, true, 'https://example.com/pork_ribs.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '67a01d7a-3811-4fb1-aa8f-ebc7e415f10d', current_timestamp(), current_timestamp()),
('6dc1b48f-7fbb-41b8-a7a8-74b563fa7a0c', 'Lamb Chops', 'Grilled lamb chops, juicy and flavorful', '19.99', true, true, 'https://example.com/lamb_chops.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '67a01d7a-3811-4fb1-aa8f-ebc7e415f10d', current_timestamp(), current_timestamp()),
('d8738a19-ecdb-4c75-a77e-7a8b2f2ba0cb', 'Smoked Brisket', 'Slow-smoked brisket, tender and smoky', '17.99', true, true, 'https://example.com/smoked_brisket.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '67a01d7a-3811-4fb1-aa8f-ebc7e415f10d', current_timestamp(), current_timestamp()),

/* Tacos */

('7f31b58c-6b5d-4ed2-b7bf-c2f5c5f5d81c', 'Al Pastor Taco', 'Soft corn tortilla filled with marinated pork, pineapple, and onion', '2.50', true, true, 'https://example.com/images/al-pastor-taco.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '35239f4a-03f4-4d04-9371-2eb1b388dd8f', current_timestamp(), current_timestamp()),
('18bcbcd7-0e15-4cb7-9a81-d1a02bfa87e6', 'Carne Asada Taco', 'Soft flour tortilla filled with grilled steak, cilantro, and onions', '3.00', true, true, 'https://example.com/images/carne-asada-taco.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '35239f4a-03f4-4d04-9371-2eb1b388dd8f', current_timestamp(), current_timestamp()),
('7a971e2e-1c12-4e0a-bb6d-60bc383fca72', 'Carnitas Taco', 'Soft corn tortilla filled with slow-cooked pork, onions, and cilantro', '2.75', true, true, 'https://example.com/images/carnitas-taco.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '35239f4a-03f4-4d04-9371-2eb1b388dd8f', current_timestamp(), current_timestamp()),
('7d2a67cc-38b9-4b32-91b4-035d4f4c67e3', 'Fish Taco', 'Soft flour tortilla filled with battered and fried white fish, lettuce, and tomato', '3.50', true, true, 'https://example.com/images/fish-taco.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '35239f4a-03f4-4d04-9371-2eb1b388dd8f', current_timestamp(), current_timestamp()),
('cd6f5aa6-5eaf-47a6-a0a1-2e6c067f1b2a', 'Barbacoa Taco', 'Soft corn tortilla filled with shredded beef, cilantro, and onions', '3.25', true, true, 'https://example.com/images/barbacoa-taco.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '35239f4a-03f4-4d04-9371-2eb1b388dd8f', current_timestamp(), current_timestamp()),

/* Soups */

('0e125ebb-356a-4f11-bb36-55110396a24b', 'Chicken Noodle Soup', 'A classic soup made with chicken, noodles, and vegetables.', '7.99', true, true, 'https://example.com/chicken-noodle-soup.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', 'd8fa6e0d-4a4f-4e30-8f6b-9b1f45295af4', current_timestamp(), current_timestamp()),
('72d306f8-64d8-4c7a-98d3-862936dbd9ba', 'Tomato Soup', 'A creamy tomato soup made with fresh tomatoes and herbs.', '6.99', true, true, 'https://example.com/tomato-soup.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', 'd8fa6e0d-4a4f-4e30-8f6b-9b1f45295af4', current_timestamp(), current_timestamp()),
('56a5b88e-b09f-4a1c-b147-891dbd9ba991', 'Vegetable Soup', 'A hearty soup made with a variety of fresh vegetables in a flavorful broth.', '8.99', true, true, 'https://example.com/vegetable-soup.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', 'd8fa6e0d-4a4f-4e30-8f6b-9b1f45295af4', current_timestamp(), current_timestamp()),
('3c8f5af7-9d10-408d-9e98-16f81a8d8c55', 'Miso Soup', 'A traditional Japanese soup made with miso paste, tofu, and seaweed.', '5.99', true, true, 'https://example.com/miso-soup.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', 'd8fa6e0d-4a4f-4e30-8f6b-9b1f45295af4', current_timestamp(), current_timestamp()),
('cbaa168a-fa88-4cd5-8c77-6e56bbf7c3a3', 'Clam Chowder', 'A creamy soup made with clams, potatoes, and vegetables.', '9.99', true, true, 'https://example.com/clam-chowder.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', 'd8fa6e0d-4a4f-4e30-8f6b-9b1f45295af4', current_timestamp(), current_timestamp()),

/* Salads */

('156f62b9-2d80-46cb-897e-d04c129f45b2', 'Caesar Salad', 'Made with romaine lettuce, croutons, parmesan cheese, and a Caesar dressing', '8.99', true, true, 'https://example.com/caesar-salad.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '6d3d3e2f-044c-4c19-832d-0d1a8ccf9c52', current_timestamp(), current_timestamp()),
('5964b4e3-797f-4b0d-a86a-3ef3c3b9441f', 'Taco Salad', 'Made with seasoned ground beef, lettuce, tomato, avocado, and crispy tortilla strips', '11.99', true, true, 'https://example.com/taco-salad.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '6d3d3e2f-044c-4c19-832d-0d1a8ccf9c52', current_timestamp(), current_timestamp()),
('10b04f8d-d5f7-4f5d-8645-1b5dcf11de3f', 'Greek Salad', 'Fresh greens, cucumbers, red onions, olives, and feta cheese with a zesty vinaigrette dressing', '9.99', true, true, 'https://example.com/greek-salad.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '6d3d3e2f-044c-4c19-832d-0d1a8ccf9c52', current_timestamp(), current_timestamp()),
('3f3a75c8-b903-45f9-bfe1-f2e032c66da1', 'Spinach Salad', 'Spinach leaves, sliced mushrooms, red onions, and hard boiled eggs with a tangy mustard dressing', '7.99', true, true, 'https://example.com/spinach-salad.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '6d3d3e2f-044c-4c19-832d-0d1a8ccf9c52', current_timestamp(), current_timestamp()),
('c96a39f1-23f3-45fc-8a3b-3aa34b2c9f9d', 'Caprese Salad', 'Ripe tomatoes, fresh mozzarella cheese, and basil leaves drizzled with olive oil and balsamic glaze', '10.99', true, true, 'https://example.com/caprese-salad.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '6d3d3e2f-044c-4c19-832d-0d1a8ccf9c52', current_timestamp(), current_timestamp()),
('a6f2e674-6590-4d8c-8fb6-116309d81421', 'Cobb Salad', 'Grilled chicken, bacon, avocado, hard boiled egg, and crumbled blue cheese on a bed of mixed greens', '11.99', true, true, 'https://example.com/cobb-salad.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '6d3d3e2f-044c-4c19-832d-0d1a8ccf9c52', current_timestamp(), current_timestamp()),

/* Hamburgers */

('0c4896c7-6aa4-4c54-9f1d-b6b7ed6ef847', 'Classic', 'A classic burger made with a beef patty, lettuce, tomato, and onion', '9.99', true, true, 'https://example.com/hamburger.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '11fcf6e5-6e5b-4c24-a0cf-f6cb74c6d2b8', current_timestamp(), current_timestamp()),
('923d1e53-1ccf-4c67-a87e-f5efeb1049a6', 'Veggie Burger', 'A meatless burger patty made with vegetables and grains, topped with avocado, lettuce, and tomato', '10.99', true, true, 'https://example.com/veggie-burger.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '11fcf6e5-6e5b-4c24-a0cf-f6cb74c6d2b8', current_timestamp(), current_timestamp()),
('4d5e6f7g-8h9i-1j2k-3l4m-5n6o7p8q9r0', 'BBQ Burger', 'Beef patty topped with BBQ sauce, crispy onion rings, and cheddar cheese', '13.99', true, true, 'https://example.com/images/bbq_burger.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '11fcf6e5-6e5b-4c24-a0cf-f6cb74c6d2b8', current_timestamp(), current_timestamp()),
('3c4d5e6f-7g8h-9i1j-k2l3-m4n5o6p7q8r', 'Mushroom Swiss Burger', 'Grilled beef patty topped with sautéed mushrooms and melted Swiss cheese', '11.99', true, true, 'https://example.com/images/mushroom_swiss_burger.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '11fcf6e5-6e5b-4c24-a0cf-f6cb74c6d2b8', current_timestamp(), current_timestamp()),
('2b3c4d5e-6f7g-8h9i-1j2k-3l4m5n6o7p8', 'Bacon Cheeseburger', 'Beef patty topped with crispy bacon and melted cheese', '12.99', true, true, 'https://example.com/images/bacon_cheeseburger.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', '11fcf6e5-6e5b-4c24-a0cf-f6cb74c6d2b8', current_timestamp(), current_timestamp()),

/* Pastas */

('7aeb758c-14b8-48f5-8680-891793dbe58a', 'Chicken Alfredo', 'A rich pasta dish made with fettuccine, grilled chicken, and a creamy Alfredo sauce', '16.99', true, true, 'https://example.com/chicken-alfredo.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', 'c95e9015-14ad-4f4d-9b4c-63ebdc7e15aa', current_timestamp(), current_timestamp()),
('04831c13-d1a9-45fb-871c-699c4501c6cb', 'Spaghetti Carbonara', 'Classic Italian pasta dish made with bacon, eggs, and Parmesan cheese.', '10.99', true, true, 'https://example.com/spaghetti_carbonara.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', 'c95e9015-14ad-4f4d-9b4c-63ebdc7e15aa', current_timestamp(), current_timestamp()),
('734767a2-fe22-42ea-8911-8985161cc7f7', 'Lasagna Bolognese', 'Layered pasta dish with a hearty meat sauce and plenty of cheese.', '12.99', true, true, 'https://example.com/lasagna_bolognese.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', 'c95e9015-14ad-4f4d-9b4c-63ebdc7e15aa', current_timestamp(), current_timestamp()),
('f19b6fa8-5999-4289-8d04-1a4bb1f63ebf', 'Fettuccine Alfredo', 'Creamy pasta dish made with butter, cream, and Parmesan cheese.', '11.99', true, true, 'https://example.com/fettuccine_alfredo.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', 'c95e9015-14ad-4f4d-9b4c-63ebdc7e15aa', current_timestamp(), current_timestamp()),
('5291d9f1-af01-4c79-bd4c-a1ad8cecd5a9', 'Penne alla Vodka', 'Pasta in a creamy tomato sauce with a splash of vodka.', '10.99', true, true, 'https://example.com/penne_alla_vodka.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', 'c95e9015-14ad-4f4d-9b4c-63ebdc7e15aa', current_timestamp(), current_timestamp()),
('e1be556f-f1a1-4eb3-9e66-c431146cf809', 'Linguine with Clams', 'Pasta with a white wine and clam sauce.', '13.99', true, true, 'https://example.com/linguine_clams.jpg', '53d55cc1-829f-45bf-b2ec-9dd649f89f45', 'c95e9015-14ad-4f4d-9b4c-63ebdc7e15aa', current_timestamp(), current_timestamp()),
		
        /* <| Drinks |> */
/* Non-Alcoholic Drinks */

('123e4567-e89b-12d3-a456-426655440001', 'Lemonade', 'Refreshing drink made with freshly squeezed lemons.', '3.50', true, true, 'https://example.com/images/lemonade.jpg', 'fe72a885-0ef2-4371-a120-7e520f531663', '123e4567-e89b-12d3-a456-426655440002', current_timestamp(), current_timestamp()),
('123e4567-e89b-12d3-a456-426655440003', 'Iced Tea', 'Cold tea brewed with tea leaves and served with ice.', '2.50', true, true, 'https://example.com/images/iced-tea.jpg', 'fe72a885-0ef2-4371-a120-7e520f531663', '123e4567-e89b-12d3-a456-426655440002', current_timestamp(), current_timestamp()),
('123e4567-e89b-12d3-a456-426655440004', 'Fruit Punch', 'Sweet and fruity drink made with mixed fruit juices.', '4.00', true, true, 'https://example.com/images/fruit-punch.jpg', 'fe72a885-0ef2-4371-a120-7e520f531663', '123e4567-e89b-12d3-a456-426655440002', current_timestamp(), current_timestamp()),
('123e4567-e89b-12d3-a456-426655440005', 'Milkshake', 'Thick and creamy beverage made with milk and ice cream.', '5.00', true, true, 'https://example.com/images/milkshake.jpg', 'fe72a885-0ef2-4371-a120-7e520f531663', '123e4567-e89b-12d3-a456-426655440002', current_timestamp(), current_timestamp()),
('123e4567-e89b-12d3-a456-426655440006', 'Orange Juice', 'Freshly squeezed juice made from oranges.', '3.00', true, true, 'https://example.com/images/orange-juice.jpg', 'fe72a885-0ef2-4371-a120-7e520f531663', '123e4567-e89b-12d3-a456-426655440002', current_timestamp(), current_timestamp()),

/* Alcoholic Drinks */

('123e4567-e89b-12d3-a456-426655440007', 'Margarita', 'Tequila-based cocktail made with lime juice and triple sec.', '8.50', 1, 1, 'https://example.com/images/margarita.jpg', 'fe72a885-0ef2-4371-a120-7e520f531663', 'b9e4e4c1-14d7-47b9-8349-0bfae3b93442', current_timestamp(), current_timestamp()),
('bb8bfb44-4461-496f-9ec0-1871f1f7df9c', 'Mojito', 'A refreshing cocktail made with rum, lime juice, sugar, soda water, and mint.', '9.99', true, true, 'https://example.com/images/mojito.jpg', 'fe72a885-0ef2-4371-a120-7e520f531663', 'b9e4e4c1-14d7-47b9-8349-0bfae3b93442', current_timestamp(), current_timestamp()),
('c5e6d5b6-5b6d-4ed8-9b3e-6ef1d4ec4f20', 'Old Fashioned', 'A classic cocktail made with bourbon or rye whiskey, sugar, bitters, and a twist of citrus rind.', '10.99', true, true, 'https://example.com/images/old-fashioned.jpg', 'fe72a885-0ef2-4371-a120-7e520f531663', 'b9e4e4c1-14d7-47b9-8349-0bfae3b93442', current_timestamp(), current_timestamp()),
('c97e9a8d-f8d2-4471-98a6-72b8f797e1e1', 'Negroni', 'Italian cocktail made with gin, sweet vermouth, and Campari', '10.50', true, true, 'https://example.com/images/negroni.jpg', 'fe72a885-0ef2-4371-a120-7e520f531663', 'b9e4e4c1-14d7-47b9-8349-0bfae3b93442', current_timestamp(), current_timestamp()),
('39b1429e-f11e-43d5-ba81-0d322de80a98', 'Cosmopolitan', 'Vodka-based cocktail made with triple sec, lime juice, and cranberry juice', '8.00', true, true, 'https://example.com/images/cosmopolitan.jpg', 'fe72a885-0ef2-4371-a120-7e520f531663', 'b9e4e4c1-14d7-47b9-8349-0bfae3b93442', current_timestamp(), current_timestamp()),
	
    /* <| Desserts |> */
/* Cakes */

('bb97fefe-3d3d-439d-b5eb-6a0a26a1815d', 'Cheesecake', 'Rich and creamy cheesecake with a graham cracker crust', '6.99', true, true, 'https://example.com/images/cheesecake.jpg', '97d3e810-5d5c-4cda-9945-078cf5f5d200', '4d8c0b1b-eb67-4f5e-8ab1-3e9585b49aae', current_timestamp(), current_timestamp()),
('9e86b9d5-0fbb-41c2-b858-d29c28d3b3db', 'Tiramisu', 'Classic Italian dessert made with ladyfingers, mascarpone cheese, and espresso', '7.99', true, true, 'https://example.com/images/tiramisu.jpg', '97d3e810-5d5c-4cda-9945-078cf5f5d200', '4d8c0b1b-eb67-4f5e-8ab1-3e9585b49aae', current_timestamp(), current_timestamp()),
('688df455-0c8b-49e2-aa10-4722823d3b8e', 'Chocolate Cake', 'Decadent chocolate cake with a rich ganache topping', '5.99', true, true, 'https://example.com/images/chocolate-cake.jpg', '97d3e810-5d5c-4cda-9945-078cf5f5d200', '4d8c0b1b-eb67-4f5e-8ab1-3e9585b49aae', current_timestamp(), current_timestamp()),
('b9a9c77c-8cc1-4822-9451-757e01947fd8', 'Apple Pie', 'Homemade apple pie with a flaky crust and cinnamon apples', '8.99', true, true, 'https://example.com/images/apple-pie.jpg', '97d3e810-5d5c-4cda-9945-078cf5f5d200', '4d8c0b1b-eb67-4f5e-8ab1-3e9585b49aae', current_timestamp(), current_timestamp()),
('55d0f8c5-4317-4c4d-9a8a-03b19a7f33d4', 'Lemon Tart', 'Tangy lemon filling in a buttery shortbread crust', '6.99', true, true, 'https://example.com/images/lemon-tart.jpg', '97d3e810-5d5c-4cda-9945-078cf5f5d200', '4d8c0b1b-eb67-4f5e-8ab1-3e9585b49aae', current_timestamp(), current_timestamp());

	