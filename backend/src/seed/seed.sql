 SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE house_rule_category_map;
TRUNCATE TABLE section_event;
TRUNCATE TABLE section_user;
TRUNCATE TABLE user_interest;
TRUNCATE TABLE announcement;
TRUNCATE TABLE house_rule;
TRUNCATE TABLE house_rule_category;
TRUNCATE TABLE event_type;
TRUNCATE TABLE user_role;
TRUNCATE TABLE section;
TRUNCATE TABLE user;
TRUNCATE TABLE building;

SET FOREIGN_KEY_CHECKS = 1;


INSERT INTO user_role (id, name) VALUES
    (1, 'student'),
    (2, 'landlord'),
    (3, 'admin'),
    (4, 'section_admin');

INSERT INTO event_type (id, name) VALUES
    (1, 'Movie night'),
    (2, 'Cleaning day'),
    (3, 'Maintenance'),
    (4, 'Fire drill');

INSERT INTO house_rule_category (id, name) VALUES
    (1, 'General'),
    (2, 'Noise'),
    (3, 'Safety'),
    (4, 'Cleaning');

INSERT INTO building (id, name, description) VALUES
    (1, 'KTH Dorm Alpha', 'Main student building'),
    (2, 'KTH Dorm Beta',  'Secondary building');

INSERT INTO section (id, building_id, name, description) VALUES
    (1, 1, 'Floor 1', 'First floor'),
    (2, 1, 'Floor 2', 'Second floor'),
    (3, 2, 'Floor 1', 'First floor (Beta)');

INSERT INTO user (
    id, email, first_name, last_name, room_number, major,
    stay_period_start, stay_period_end, profile_picture_url
) VALUES
      (1, 'alice@example.com', 'Alice', 'Andersson', 101, 'Computer Science', '2026-01-01', '2026-06-30', NULL),
      (2, 'bob@example.com',   'Bob',   'Berg',      202, 'Electrical Eng',  '2026-02-01', '2026-07-31', NULL),
      (3, 'carol@example.com', 'Carol', 'Carlsson',  305, 'Design',          '2026-01-15', '2026-12-15', NULL),
      (4, 'dan@example.com',   'Dan',   'Dahl',      110, 'Business',        '2026-03-01', '2026-08-31', NULL);

INSERT INTO section_user (user_id, section_id, role_id) VALUES
    (1, 1, 1),
    (2, 2, 1),
    (3, 3, 1),
    (4, 1, 4);

INSERT INTO user_interest (user_id, interest) VALUES
    (1, 'cooking'),
    (1, 'sports'),
    (2, 'music'),
    (2, 'gaming'),
    (3, 'reading'),
    (4, 'gardening');

INSERT INTO announcement (id, building_id, title, meta, body) VALUES
    (1, 1, 'Welcome!', 'Getting started', 'Welcome to KTH Dorm Alpha. Please read the house rules.'),
    (2, 1, 'Quiet hours', 'Reminder', 'Quiet hours are 22:00–08:00 every day.'),
    (3, 2, 'Maintenance', 'Info', 'Elevator maintenance scheduled this week.');

INSERT INTO house_rule (id, building_id, title, body, sort_order, updated_at) VALUES
    (1, 1, 'No smoking', 'Smoking is not allowed indoors.', 1, '2026-05-01'),
    (2, 1, 'Respect quiet hours', 'Keep noise down at night.', 2, '2026-05-01'),
    (3, 1, 'Clean shared kitchen', 'Leave the kitchen as you found it.', 3, '2026-05-01'),
    (4, 2, 'Sort your trash', 'Use the correct bins for recycling.', 1, '2026-05-01');

INSERT INTO house_rule_category_map (house_rule_id, house_rule_category_id) VALUES
    (1, 1),
    (1, 3),
    (2, 2),
    (3, 4),
    (4, 1);

INSERT INTO section_event (
    id, section_id, event_type_id, description, start_time, end_time
) VALUES
      (1, 1, 1, 'Bring snacks and a movie suggestion!', '2026-05-10 19:00:00', '2026-05-10 22:00:00'),
      (2, 2, 2, 'Help clean common areas.',           '2026-05-11 10:00:00', '2026-05-11 12:00:00'),
      (3, 3, 3, NULL,                                 '2026-05-12 09:00:00', '2026-05-12 11:00:00');