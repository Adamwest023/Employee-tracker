INSERT INTO department 
(name)
VALUES 
('sales'),
('IT'),
('marketing'),
('recruiting');

INSERT INTO role 
(title, salary, department_id)
VALUES
('engineer', 100000, 2),
('sales associate', 60000, 1),
('graphic designer', 55000, 3),
('recruiter', 70000, 4),
('jr sales associate', 35000, 1),
('senior engineer', 120000,2);


INSERT INTO employee 
(first_name, last_name, role_id, manager_id) 
VALUES 
('adam','west', 1 , null),
('patrick','rothfuss', 2 , null),
('derek','henry', 1 , 1),
('margaret','thatcher',1 , 3);