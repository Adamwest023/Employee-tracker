INSERT INTO employee 
(first_name, last_name, role_id, manager_id) 
VALUES 
('adam','west', 1 , 2),
('patrick','rothfuss', 2 , 2),
('derek','henry', 1 , 2),
('margaret','thatcher',1 , 2);

INSERT INTO role 
(title, salary)
VALUES
('engineer', 100000),
('sales associate', 60000);

INSERT INTO department 
(name)
VALUES 
('sales'),
('IT');