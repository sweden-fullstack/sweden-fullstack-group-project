CREATE TABLE section_cleaning_state (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_id INT NOT NULL,
    duty_template JSON NOT NULL,
    days_without_cleaning JSON NOT NULL,
    schedule JSON NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE section_cleaning_state
    ADD CONSTRAINT uq_section_cleaning_state_section UNIQUE (section_id);
