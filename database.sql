-- Creating the nguoi_dung (user) table
CREATE TABLE nguoi_dung (
    nguoi_dung_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    mat_khau VARCHAR(100) NOT NULL,
    ho_ten VARCHAR(100),
    tuoi INT,
    anh_dai_dien VARCHAR(255),
    is_active BOOLEAN DEFAULT 1
);

-- Creating the hinh_anh (image) table
CREATE TABLE hinh_anh (
    hinh_id INT AUTO_INCREMENT PRIMARY KEY,
    ten_hinh VARCHAR(100),
    duong_dan VARCHAR(255) NOT NULL,
    mo_ta VARCHAR(255),
    nguoi_dung_id INT,
    is_delete BOOLEAN DEFAULT 0,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id)
);

-- Creating the binh_luan (comment) table
CREATE TABLE binh_luan (
    binh_luan_id INT AUTO_INCREMENT PRIMARY KEY,
    nguoi_dung_id INT,
    hinh_id INT,
    ngay_binh_luan DATE,
    noi_dung VARCHAR(255),
    is_delete BOOLEAN DEFAULT 0,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id),
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id)
);

-- Creating the luu_anh (saved_images) table
CREATE TABLE luu_anh (
    nguoi_dung_id INT,
    hinh_id INT,
    ngay_luu DATE,
    is_delete BOOLEAN DEFAULT 0,
    PRIMARY KEY (nguoi_dung_id, hinh_id),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id),
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id)
);

-- Inserting data into the nguoi_dung (user) table
INSERT INTO nguoi_dung (email, mat_khau, ho_ten, tuoi, anh_dai_dien, is_active) 
VALUES 
('user1@example.com', 'password123', 'Nguyen Van A', 25, 'path/to/profile1.jpg', TRUE),
('user2@example.com', 'password456', 'Tran Thi B', 30, 'path/to/profile2.jpg', TRUE),
('user3@example.com', 'password789', 'Le Thi C', 28, 'path/to/profile3.jpg', TRUE),
('user4@example.com', 'password321', 'Hoang Van D', 22, 'path/to/profile4.jpg', TRUE),
('user5@example.com', 'password654', 'Phan Thi E', 35, 'path/to/profile5.jpg', TRUE),
('user6@example.com', 'password987', 'Ngo Van F', 40, 'path/to/profile6.jpg', TRUE),
('user7@example.com', 'password159', 'Bui Thi G', 29, 'path/to/profile7.jpg', TRUE),
('user8@example.com', 'password753', 'Tran Van H', 31, 'path/to/profile8.jpg', TRUE),
('user9@example.com', 'password246', 'Vu Thi I', 27, 'path/to/profile9.jpg', TRUE),
('user10@example.com', 'password135', 'Ho Thi J', 33, 'path/to/profile10.jpg', TRUE);

-- Inserting data into the hinh_anh (image) table
INSERT INTO hinh_anh (ten_hinh, duong_dan, mo_ta, nguoi_dung_id, is_delete) 
VALUES 
('Image 1', 'path/to/image1.jpg', 'This is the first image', 1, FALSE),
('Image 2', 'path/to/image2.jpg', 'This is the second image', 1, FALSE),
('Image 3', 'path/to/image3.jpg', 'This is the third image', 2, FALSE),
('Image 4', 'path/to/image4.jpg', 'This is the fourth image', 3, FALSE),
('Image 5', 'path/to/image5.jpg', 'This is the fifth image', 3, FALSE),
('Image 6', 'path/to/image6.jpg', 'This is the sixth image', 4, FALSE),
('Image 7', 'path/to/image7.jpg', 'This is the seventh image', 5, FALSE),
('Image 8', 'path/to/image8.jpg', 'This is the eighth image', 6, FALSE),
('Image 9', 'path/to/image9.jpg', 'This is the ninth image', 7, FALSE),
('Image 10', 'path/to/image10.jpg', 'This is the tenth image', 8, FALSE);

-- Inserting data into the binh_luan (comment) table
INSERT INTO binh_luan (nguoi_dung_id, hinh_id, ngay_binh_luan, noi_dung, is_delete) 
VALUES 
(1, 1, '2024-11-01', 'Great picture!', FALSE),
(2, 2, '2024-11-02', 'Nice shot!', FALSE),
(3, 3, '2024-11-03', 'Love this image!', FALSE),
(4, 4, '2024-11-04', 'Amazing view!', FALSE),
(5, 5, '2024-11-05', 'Beautiful!', FALSE),
(6, 6, '2024-11-06', 'Incredible capture!', FALSE),
(7, 7, '2024-11-07', 'Fantastic!', FALSE),
(8, 8, '2024-11-08', 'Stunning!', FALSE),
(9, 9, '2024-11-09', 'Very nice!', FALSE),
(10, 10, '2024-11-10', 'Awesome!', FALSE);

-- Inserting data into the luu_anh (saved_images) table
INSERT INTO luu_anh (nguoi_dung_id, hinh_id, ngay_luu, is_delete) 
VALUES 
(1, 2, '2024-11-11', FALSE),
(2, 3, '2024-11-12', FALSE),
(3, 4, '2024-11-13', FALSE),
(4, 5, '2024-11-14', FALSE),
(5, 6, '2024-11-15', FALSE),
(6, 7, '2024-11-16', FALSE),
(7, 8, '2024-11-17', FALSE),
(8, 9, '2024-11-18', FALSE),
(9, 10, '2024-11-19', FALSE),
(10, 1, '2024-11-20', FALSE);

