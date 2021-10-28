INSERT INTO department 
(name)
VALUES 
('sales'),
('IT');

INSERT INTO role 
(title, salary, department_id)
VALUES
('engineer', 100000, 2),
('sales associate', 60000, 1);

INSERT INTO employee 
(first_name, last_name, role_id, manager_id) 
VALUES 
('adam','west', 1 , null),
('patrick','rothfuss', 2 , null),
('derek','henry', 1 , 1),
('margaret','thatcher',1 , 3);