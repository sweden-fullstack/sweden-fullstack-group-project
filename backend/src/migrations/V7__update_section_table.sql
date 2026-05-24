TRUNCATE section_event;

ALTER TABLE section_event 
   ADD COLUMN title varchar(255) NOT NULL, 
   ADD COLUMN building_id INT NOT NULL,
   MODIFY COLUMN section_id INT NULL DEFAULT NULL,
   ADD CONSTRAINT fk_section_event_building_id
   FOREIGN KEY (building_id) REFERENCES building(id);
