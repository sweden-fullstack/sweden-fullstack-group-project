ALTER TABLE section
    ADD CONSTRAINT fk_section_building
    FOREIGN KEY (building_id) REFERENCES building(id);

ALTER TABLE announcement
    ADD CONSTRAINT fk_announcement_building
    FOREIGN KEY (building_id) REFERENCES building(id)
    ON DELETE CASCADE;

ALTER TABLE house_rule
    ADD CONSTRAINT fk_house_rule_building
    FOREIGN KEY (building_id) REFERENCES building(id)
    ON DELETE CASCADE ;

ALTER TABLE section_event
    ADD CONSTRAINT fk_section_event_section
    FOREIGN KEY (section_id) REFERENCES section(id)
    ON DELETE CASCADE,
    ADD CONSTRAINT fk_section_event_event_typep_id
    FOREIGN KEY (event_type_id) REFERENCES event_type(id)
    ON DELETE RESTRICT;

ALTER TABLE section_user
    ADD CONSTRAINT fk_section_user_user
    FOREIGN KEY (user_id) REFERENCES user(id)
    ON DELETE CASCADE,
    ADD CONSTRAINT fk_section_user_section
    FOREIGN KEY (section_id) REFERENCES section(id)
    ON DELETE CASCADE,
    ADD CONSTRAINT fk_section_user_role
    FOREIGN KEY (role_id) REFERENCES user_role(id)
    ON DELETE RESTRICT;

ALTER TABLE user_interest
    ADD CONSTRAINT fk_user_interest_user
    FOREIGN KEY (user_id) REFERENCES user(id)
    ON DELETE CASCADE;

ALTER TABLE house_rule_category_map
    ADD CONSTRAINT fk_house_rule_category_map_rule
    FOREIGN KEY (house_rule_id) REFERENCES house_rule(id)
    ON DELETE CASCADE,
    ADD CONSTRAINT fk_house_rule_category_map_category
    FOREIGN KEY (house_rule_category_id) REFERENCES house_rule_category(id)
    ON DELETE CASCADE;