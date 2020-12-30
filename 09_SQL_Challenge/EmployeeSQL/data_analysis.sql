--List the following details of each employee: employee number, last name, first name, gender, and salary.
select employees.emp_no, employees.last_name, employees.first_name, employees.gender, salaries.salary 
from employees, salaries
where employees.emp_no = salaries.emp_no;

--List employees who were hired in 1986.
--I also sorted by hired date: 
select * from employees 
where hire_date >= '1986-01-01' and hire_date < '1987-01-01'
order by 6;

--(List the manager of each department with the following information: department number, department name, 
-- the manager's employee number, last name, first name, and start and end employment dates.)
select departments.dept_no, departments.dept_name, dept_manager.emp_no, employees.last_name, employees.first_name,
dept_manager.from_date, dept_manager.to_date
from departments
inner join dept_manager on dept_manager.dept_no = departments.dept_no
inner join employees on dept_manager.emp_no = employees.emp_no;

--List the department of each employee with the following information: employee number, last name, first name, and department name.
select employees.emp_no, employees.last_name, employees.first_name, departments.dept_name
from employees
inner join dept_emp on dept_emp.emp_no = employees.emp_no
inner join departments on dept_emp.dept_no = departments.dept_no;

--List all employees whose first name is "Hercules" and last names begin with "B."
-- need to use wildcard -- like B%
select * from employees
where first_name = 'Hercules' and last_name like 'B%';

--List all employees in the Sales department, including their employee number, last name, first name, and department name.
select employees.emp_no, employees.last_name, employees.first_name, departments.dept_name
from employees
inner join dept_emp on dept_emp.emp_no = employees.emp_no
inner join departments on dept_emp.dept_no = departments.dept_no
where departments.dept_name = 'Sales';

--List all employees in the Sales and Development departments, including their employee number, last name, first name, and department name.
select employees.emp_no, employees.last_name, employees.first_name, departments.dept_name
from employees
inner join dept_emp on dept_emp.emp_no = employees.emp_no
inner join departments on dept_emp.dept_no = departments.dept_no
where departments.dept_name = 'Sales' or departments.dept_name = 'Development';

--n descending order, list the frequency count of employee last names, i.e., how many employees share each last name.
-- need to group by last name
select last_name, count(employees.last_name) as "count_last_name" from employees
group by employees.last_name
order by 2 desc;

-- search "my ID # 499942"
select * from employees where emp_no = 499942
-- hahaha... April fools day 

-- Notes: 
-- the most common (top 3) last names in this company are: Baba, Coorg, and Gelosh
-- SQL is really fast and I like it :)

