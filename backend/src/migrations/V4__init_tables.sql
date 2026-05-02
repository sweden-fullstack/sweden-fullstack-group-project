CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    room_number INT NOT NULL,
    major VARCHAR(255) NOT NULL,
    stay_period_start DATE NOT NULL,
    stay_period_end DATE NOT NULL,
    profile_picture_url VARCHAR(2048)
);

CREATE TABLE section (
    id INT AUTO_INCREMENT PRIMARY KEY,
    building_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE building (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE user_role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE event_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE announcement (
    id INT AUTO_INCREMENT PRIMARY KEY,
    building_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    meta VARCHAR(255) NOT NULL,
    body TEXT NOT NULL
);

CREATE TABLE house_rule_category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE house_rule (
    id INT AUTO_INCREMENT PRIMARY KEY,
    building_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    sort_order INT NOT NULL,
    updated_at DATE NOT NULL
);

CREATE TABLE section_event (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_id INT NOT NULL,
    event_type_id INT NOT NULL,
    description TEXT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL
);

CREATE TABLE section_user (
    user_id INT NOT NULL,
    section_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, section_id, role_id)
);

CREATE TABLE user_interest (
    user_id INT NOT NULL,
    interest VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, interest)
);

CREATE TABLE house_rule_category_map (
    house_rule_id INT NOT NULL,
    house_rule_category_id INT NOT NULL,
    PRIMARY KEY (house_rule_id, house_rule_category_id)

);
