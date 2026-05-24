CREATE TABLE section_event_assignee (
    user_id INT NOT NULL,
    section_event_id INT NOT NULL,
    PRIMARY KEY (user_id, section_event_id),
    FOREIGN KEY (user_id) REFERENCES user(id)
    ON DELETE CASCADE,
    FOREIGN KEY (section_event_id) REFERENCES section_event(id)
    ON DELETE CASCADE
)