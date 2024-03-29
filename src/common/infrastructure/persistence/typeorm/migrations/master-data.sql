INSERT INTO customers(first_name, last_name, email, password, car_make) VALUES
('John','Doe','john.doe@gmail.com','password','Toyota Camry'),
('Brennan','Carr','carrb@gmail.com','CarrBrenn','BMW 2 Series'),
("Wynne","Clark","mauris@google.net","Proin","Toyota Prius"),
("Kim","Moses","magna.tellus@aol.com","auctor.","Mercedes-AMG"),
("Wallace","Walters","duis@aol.org","Vivamus","BMW M760e"),
("Chadwick","Lee","et.tristique@hotmail.com","Phasellus","Mercedes-Maybach"),
("Nero","Fletcher","nulla@outlook.ca","facilisi.","BMW X5");


INSERT INTO mechanics(mechanic_name, email, password, address, description) VALUES
  ("Karina Caldwell Auto Service","dictum.eu.placerat@google.net","interdum","Ap #392-9490 Sed Road","We have been serving the community of Oakdale and the surrounding area since 1999. This RepairPal Certified shop strives to stay on top of the latest technologies and to be a leader in the local community by providing the highest level of automotive repair coupled with the best customer service."),
  ("Blue Star Brothers","integer@hotmail.ca","leviosa,","P.O. Box 272, 8294 Sed St.","This location features a team of automotive professionals whose commitment to ongoing training and investment in tools and equipment helps make them capable of repairs ranging from tires and wheel alignment, to minor and major mechanical repairs, to check engine light diagnosis and repair, to state smog and safety inspections, as well as your scheduled maintenance needs."),
  ("Formula I","arcu.iaculis.enim@yahoo.net","alohomora","948-8110 Sed Street","At Hankey Farms Auto Service, our automotive team provides expert auto repair in Oakdale, PA. Whether for work or for leisure, you can depend on us to get your car back in working order."),
  ("Giacomo Fletcher Workshops and Business","dapibus@icloud.net", "mypassword", "Ap #920-6637 Enim. St."," With over 50 years of experience, our seasoned mechanics at our auto repair shop have the skills to remedy any performance issue with your vehicle and get you back on the road. From alignments to tune-ups, we provide bumper-to-bumper auto repair services. "),
  ("Fast Car Lima","pede.ultrices@aol.ca","dapibus","192 Massa. Rd.","With over 35 years of combined experience in the automotive industry, we know how to maintain and repair your investment correctly. It's very simple. We take pride in our work and value our customers' feedback.");

INSERT INTO appointments(customer_id, mechanic_id, status, type, date, amount) VALUES
  (2,4,"Requested","Premium","04/26/2022","150.00"),
  (3,3,"Accepted","Premium","02/02/2023","145.00"),
  (4,2,"Accepted","Basic","12/09/2022","80.00"),
  (1,2,"Finished","Premium","10/21/2022","93.00"),
  (5,1,"Rejected","Basic","12/27/2022","68.00");