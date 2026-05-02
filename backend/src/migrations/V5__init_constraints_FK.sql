CREATE INDEX idx_section_building_id ON
    section(building_id);
CREATE INDEX idx_announcement_building_id ON
    announcement(building_id);
CREATE INDEX idx_house_rule_building_id ON
    house_rule(building_id);

CREATE INDEX idx_section_event_section_id ON
    section_event(section_id);
CREATE INDEX idx_section_event_event_type ON
    section_event(event_id);

CREATE INDEX idx_section_user_user_id ON
    section_user(user_id);
CREATE INDEX idx_section_user_section_id ON
    section_user(section_id);
CREATE INDEX idx_section_user_role_id ON
    section_user(role_id);

CREATE INDEX idx_user_interest_user_id ON
    user_interest(user_id);

CREATE INDEX idx_house_rule_cat_map_rule_id ON
    house_rule_category_map(house_rule_id);
CREATE INDEX idx_house_rule_cat_map_cat_id ON
    house_rule_category_map(house_rule_category_id);


ALTER TABLE section
    ADD CONSTRAINT fk_section_building
    FOREIGN KEY (building_id) REFERENCES building(id)
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE announcement
    ADD CONSTRAINT fk_announcement_building
    FOREIGN KEY (building_id) REFERENCES building(id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE house_rule
    ADD CONSTRAINT fk_house_rule_building
    FOREIGN KEY (building_id) REFERENCES building(id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE section_event
    ADD CONSTRAINT fk_section_event_section
    FOREIGN KEY (section_id) REFERENCES section(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_section_event_event_id
    FOREIGN KEY (event_id) REFERENCES event_id(id)
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE section_user
    ADD CONSTRAINT fk_section_user_user
    FOREIGN KEY (user_id) REFERENCES user(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_section_user_section
    FOREIGN KEY (section_id) REFERENCES section(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_section_user_role
    FOREIGN KEY (role_id) REFERENCES user_role(id)
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE user_interest
    ADD CONSTRAINT fk_user_interest_user
    FOREIGN KEY (user_id) REFERENCES user(id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE house_rule_category_map
    ADD CONSTRAINT fk_house_rule_category_map_rule
    FOREIGN KEY (house_rule_id) REFERENCES house_rule(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_house_rule_category_map_category
    FOREIGN KEY (house_rule_category_id) REFERENCES house_rule_category(id)
    ON DELETE CASCADE ON UPDATE CASCADE;