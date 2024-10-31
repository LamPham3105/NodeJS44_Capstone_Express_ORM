-- Creating the nguoi_dung (user) table
CREATE TABLE nguoi_dung (
    nguoi_dung_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    mat_khau VARCHAR(100) NOT NULL,
    ho_ten VARCHAR(100),
    tuoi INT,
    anh_dai_dien VARCHAR(255)
);

-- Creating the hinh_anh (image) table
CREATE TABLE hinh_anh (
    hinh_id INT AUTO_INCREMENT PRIMARY KEY,
    ten_hinh VARCHAR(100),
    duong_dan VARCHAR(255) NOT NULL,
    mo_ta VARCHAR(255),
    nguoi_dung_id INT,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id)
);

-- Creating the binh_luan (comment) table
CREATE TABLE binh_luan (
    binh_luan_id INT AUTO_INCREMENT PRIMARY KEY,
    nguoi_dung_id INT,
    hinh_id INT,
    ngay_binh_luan DATE,
    noi_dung VARCHAR(255),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id),
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id)
);

-- Creating the luu_anh (saved_images) table
CREATE TABLE luu_anh (
    nguoi_dung_id INT,
    hinh_id INT,
    ngay_luu DATE,
    PRIMARY KEY (nguoi_dung_id, hinh_id),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id),
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id)
);

-- Insert sample data into nguoi_dung table
INSERT INTO nguoi_dung (nguoi_dung_id, email, mat_khau, ho_ten, tuoi, anh_dai_dien)
VALUES 
    (1, 'alice@example.com', 'password1', 'Alice Johnson', 30, 'alice_avatar.jpg'),
    (2, 'bob@example.com', 'password2', 'Bob Smith', 25, 'bob_avatar.jpg'),
    (3, 'carol@example.com', 'password3', 'Carol Davis', 29, 'carol_avatar.jpg'),
    (4, 'dave@example.com', 'password4', 'Dave Wilson', 31, 'dave_avatar.jpg'),
    (5, 'eve@example.com', 'password5', 'Eve Brown', 27, 'eve_avatar.jpg'),
    (6, 'frank@example.com', 'password6', 'Frank Miller', 26, 'frank_avatar.jpg'),
    (7, 'grace@example.com', 'password7', 'Grace Lee', 28, 'grace_avatar.jpg'),
    (8, 'heidi@example.com', 'password8', 'Heidi White', 24, 'heidi_avatar.jpg'),
    (9, 'ivan@example.com', 'password9', 'Ivan Harris', 32, 'ivan_avatar.jpg'),
    (10, 'judy@example.com', 'password10', 'Judy Martin', 23, 'judy_avatar.jpg'),
    (11, 'ken@example.com', 'password11', 'Ken Thompson', 29, 'ken_avatar.jpg'),
    (12, 'laura@example.com', 'password12', 'Laura Wright', 27, 'laura_avatar.jpg'),
    (13, 'mike@example.com', 'password13', 'Mike Clark', 28, 'mike_avatar.jpg'),
    (14, 'nancy@example.com', 'password14', 'Nancy Lewis', 26, 'nancy_avatar.jpg'),
    (15, 'oscar@example.com', 'password15', 'Oscar Robinson', 30, 'oscar_avatar.jpg'),
    (16, 'pam@example.com', 'password16', 'Pam Hall', 22, 'pam_avatar.jpg'),
    (17, 'quincy@example.com', 'password17', 'Quincy Allen', 34, 'quincy_avatar.jpg'),
    (18, 'rachel@example.com', 'password18', 'Rachel Young', 31, 'rachel_avatar.jpg'),
    (19, 'steve@example.com', 'password19', 'Steve King', 33, 'steve_avatar.jpg'),
    (20, 'tina@example.com', 'password20', 'Tina Scott', 29, 'tina_avatar.jpg');

-- Insert sample data into hinh_anh table
INSERT INTO hinh_anh (hinh_id, ten_hinh, duong_dan, mo_ta, nguoi_dung_id)
VALUES 
    (1, 'Beach', '/images/beach.jpg', 'Sunny beach view', 1),
    (2, 'Forest', '/images/forest.jpg', 'Green forest', 2),
    (3, 'Cityscape', '/images/cityscape.jpg', 'Night city lights', 3),
    (4, 'Desert', '/images/desert.jpg', 'Vast desert', 4),
    (5, 'Lake', '/images/lake.jpg', 'Calm lake', 5),
    (6, 'Mountain', '/images/mountain.jpg', 'Snow-capped mountains', 6),
    (7, 'River', '/images/river.jpg', 'Flowing river', 7),
    (8, 'Waterfall', '/images/waterfall.jpg', 'Majestic waterfall', 8),
    (9, 'Ocean', '/images/ocean.jpg', 'Deep blue ocean', 9),
    (10, 'Sunrise', '/images/sunrise.jpg', 'Sunrise over hills', 10),
    (11, 'Birds', '/images/birds.jpg', 'Flying birds', 11),
    (12, 'Rainforest', '/images/rainforest.jpg', 'Lush rainforest', 12),
    (13, 'Snowfield', '/images/snowfield.jpg', 'Snow-covered field', 13),
    (14, 'Volcano', '/images/volcano.jpg', 'Smoking volcano', 14),
    (15, 'Canyon', '/images/canyon.jpg', 'Grand canyon', 15),
    (16, 'Tundra', '/images/tundra.jpg', 'Cold tundra landscape', 16),
    (17, 'Swamp', '/images/swamp.jpg', 'Misty swamp', 17),
    (18, 'Coral Reef', '/images/coral_reef.jpg', 'Colorful coral reef', 18),
    (19, 'Glacier', '/images/glacier.jpg', 'Ice glacier', 19),
    (20, 'Field', '/images/field.jpg', 'Green field under blue sky', 20);

-- Insert sample data into binh_luan table
INSERT INTO binh_luan (binh_luan_id, nguoi_dung_id, hinh_id, ngay_binh_luan, noi_dung)
VALUES 
    (1, 1, 2, '2024-10-05', 'Beautiful view!'),
    (2, 2, 1, '2024-10-06', 'Looks peaceful.'),
    (3, 3, 4, '2024-10-07', 'Stunning landscape!'),
    (4, 4, 3, '2024-10-08', 'Amazing colors!'),
    (5, 5, 6, '2024-10-09', 'Breathtaking!'),
    (6, 6, 5, '2024-10-10', 'Very serene.'),
    (7, 7, 8, '2024-10-11', 'I want to visit here!'),
    (8, 8, 7, '2024-10-12', 'So calming.'),
    (9, 9, 10, '2024-10-13', 'Great shot!'),
    (10, 10, 9, '2024-10-14', 'Love the scenery!'),
    (11, 11, 12, '2024-10-15', 'Absolutely amazing!'),
    (12, 12, 11, '2024-10-16', 'So peaceful.'),
    (13, 13, 14, '2024-10-17', 'Spectacular view!'),
    (14, 14, 13, '2024-10-18', 'Incredible nature.'),
    (15, 15, 16, '2024-10-19', 'Wow, just wow!'),
    (16, 16, 15, '2024-10-20', 'Nature is beautiful.'),
    (17, 17, 18, '2024-10-21', 'Marvelous!'),
    (18, 18, 17, '2024-10-22', 'Perfect place to relax.'),
    (19, 19, 20, '2024-10-23', 'So picturesque!'),
    (20, 20, 19, '2024-10-24', 'I love this spot.');

-- Insert sample data into luu_anh table
INSERT INTO luu_anh (nguoi_dung_id, hinh_id, ngay_luu)
VALUES 
    (1, 3, '2024-10-05'),
    (2, 4, '2024-10-06'),
    (3, 5, '2024-10-07'),
    (4, 6, '2024-10-08'),
    (5, 7, '2024-10-09'),
    (6, 8, '2024-10-10'),
    (7, 9, '2024-10-11'),
    (8, 10, '2024-10-12'),
    (9, 11, '2024-10-13'),
    (10, 12, '2024-10-14'),
    (11, 13, '2024-10-15'),
    (12, 14, '2024-10-16'),
    (13, 15, '2024-10-17'),
    (14, 16, '2024-10-18'),
    (15, 17, '2024-10-19'),
    (16, 18, '2024-10-20'),
    (17, 19, '2024-10-21'),
    (18, 20, '2024-10-22'),
    (19, 1, '2024-10-23'),
    (20, 2, '2024-10-24');
