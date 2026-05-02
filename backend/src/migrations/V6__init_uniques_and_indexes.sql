ALTER TABLE user
    ADD CONSTRAINT uq_user_email UNIQUE (email);

ALTER TABLE user_role
    ADD CONSTRAINT uq_user_role_name UNIQUE (name);

ALTER TABLE event_type
    ADD CONSTRAINT uq_event_type_name UNIQUE (name);

ALTER TABLE house_rule_category
    ADD CONSTRAINT uq_house_rule_category_name UNIQUE (name);

ALTER TABLE section
    ADD CONSTRAINT uq_section_building_name UNIQUE (building_id, name);