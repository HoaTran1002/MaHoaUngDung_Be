-- Tạo bảng SINHVIEN
CREATE TABLE SINHVIEN (
    MASV NVARCHAR(20) PRIMARY KEY,            -- Khóa chính
    HOTEN NVARCHAR(100) NOT NULL,             -- Bắt buộc
    NGAYSINH DATETIME,                        -- Ngày sinh
    DIACHI NVARCHAR(200),                     -- Địa chỉ
    MALOP VARCHAR(20),                        -- Mã lớp
    TENDN NVARCHAR(100) NOT NULL,             -- Tên đăng nhập, bắt buộc
    MATKHAU VARBINARY NOT NULL                -- Mật khẩu mã hóa, bắt buộc
);

-- Tạo bảng NHANVIEN
CREATE TABLE NHANVIEN (
    MANV VARCHAR(20) PRIMARY KEY,             -- Khóa chính
    HOTEN NVARCHAR(100) NOT NULL,             -- Bắt buộc
    EMAIL VARCHAR(20),                        -- Email
    LUONG VARBINARY,                          -- Lương mã hóa
    TENDN NVARCHAR(100) NOT NULL,             -- Tên đăng nhập, bắt buộc
    MATKHAU VARBINARY NOT NULL,               -- Mật khẩu mã hóa, bắt buộc
    PUBKEY VARCHAR(20)                        -- Tên khóa công khai
);

-- Tạo bảng LOP
CREATE TABLE LOP (
    MALOP VARCHAR(20) PRIMARY KEY,            -- Khóa chính
    TENLOP NVARCHAR(100) NOT NULL,            -- Tên lớp, bắt buộc
    MANV VARCHAR(20),                         -- Mã nhân viên
    FOREIGN KEY (MANV) REFERENCES NHANVIEN(MANV) -- Liên kết đến bảng NHANVIEN
);

-- Tạo bảng HOCPHAN
CREATE TABLE HOCPHAN (
    MAHP VARCHAR(20) PRIMARY KEY,             -- Khóa chính
    TENHP NVARCHAR(100) NOT NULL,             -- Tên học phần, bắt buộc
    SOTC INT                                  -- Số tín chỉ
);

-- Tạo bảng BANGDIEM
CREATE TABLE BANGDIEM (
    MASV VARCHAR(20),                         -- Khóa chính
    MAHP VARCHAR(20),                         -- Khóa chính
    DIEMTHI VARBINARY,                        -- Điểm thi mã hóa
    PRIMARY KEY (MASV, MAHP),                 -- Khóa chính kết hợp
    FOREIGN KEY (MASV) REFERENCES SINHVIEN(MASV), -- Liên kết đến bảng SINHVIEN
    FOREIGN KEY (MAHP) REFERENCES HOCPHAN(MAHP)  -- Liên kết đến bảng HOCPHAN
);


-- i
DELIMITER $$

CREATE PROCEDURE SP_INS_PUBLIC_ENCRYPT_NHANVIEN(
    IN p_MANV VARCHAR(20),
    IN p_HOTEN NVARCHAR(100),
    IN p_EMAIL VARCHAR(20),
    IN p_LUONG VARCHAR(512),         -- Lương đã được mã hóa từ client
    IN p_TENDN NVARCHAR(100),
    IN p_MK VARCHAR(512),            -- Mật khẩu đã được mã hóa từ client
    IN p_PUB VARCHAR(512)            -- Khóa công khai được tạo từ client
)
BEGIN
    -- Biến để lưu trữ giá trị mã hóa SHA1 của mật khẩu
    DECLARE encrypted_password VARBINARY(255);
    -- Biến để lưu trữ giá trị mã hóa RSA của lương
    DECLARE encrypted_salary VARBINARY(255);

    -- Mã hóa mật khẩu bằng SHA1
    SET encrypted_password = SHA1(p_MK);

    -- Mã hóa lương sử dụng RSA (Lưu ý: Bạn cần sử dụng một thư viện bên ngoài trong ứng dụng client để mã hóa lương với RSA)
    -- Trong MySQL, bạn không thể mã hóa bằng RSA trực tiếp, nên bạn cần phải thực hiện việc mã hóa RSA ở phía client và truyền giá trị đã mã hóa vào.
    SET encrypted_salary = UNHEX(p_LUONG); -- Giả sử p_LUONG đã được mã hóa và được truyền dưới dạng chuỗi hex

    -- Thực hiện INSERT vào bảng NHANVIEN
    INSERT INTO NHANVIEN (MANV, HOTEN, EMAIL, LUONG, TENDN, MATKHAU, PUBKEY)
    VALUES (p_MANV, p_HOTEN, p_EMAIL, encrypted_salary, p_TENDN, encrypted_password, p_PUB);

END $$

DELIMITER ;

-- ex:
EXEC SP_INS_PUBLIC_ENCRYPT_NHANVIEN 
    'NV01', 
    'NGUYEN VAN A',
    'NVA@domain.com',
    'LLLLLL',  -- Lương đã được mã hóa bằng RSA từ client
    'NVA',     -- Tên đăng nhập
    'MKMKMKMK', -- Mật khẩu đã được mã hóa SHA1 từ client
    'PUBPUB';  -- Khóa công khai tạo từ client


-- ii
DELIMITER $$

CREATE PROCEDURE SP_SEL_PUBLIC_ENCRYPT_NHANVIEN(
    IN p_TENDN NVARCHAR(100),      -- Tên đăng nhập
    IN p_MK NVARCHAR(100)          -- Mật khẩu của nhân viên đã mã hóa SHA1
)
BEGIN
    -- Biến để lưu trữ thông tin nhân viên
    DECLARE v_MANV VARCHAR(20);
    DECLARE v_HOTEN NVARCHAR(100);
    DECLARE v_EMAIL VARCHAR(20);
    DECLARE v_LUONG VARBINARY(255);

    -- Truy vấn thông tin nhân viên từ bảng NHANVIEN
    SELECT MANV, HOTEN, EMAIL, LUONG
    INTO v_MANV, v_HOTEN, v_EMAIL, v_LUONG
    FROM NHANVIEN
    WHERE TENDN = p_TENDN
    AND MATKHAU = SHA1(p_MK);  -- So sánh mật khẩu đã mã hóa bằng SHA1

    -- Trả về kết quả (trả về các trường thông tin nhân viên)
    SELECT v_MANV AS MANV, v_HOTEN AS HOTEN, v_EMAIL AS EMAIL, v_LUONG AS LUONG;
    
END $$

DELIMITER ;

-- ex:
EXEC SP_SEL_PUBLIC_ENCRYPT_NHANVIEN 
    'NVA',   -- Tên đăng nhập (TENDN)
    'MKMKMKMK'; -- Mật khẩu đã mã hóa (MK)
