-- Tạo cơ sở dữ liệu nếu chưa tồn tại
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'QLSVNhom')
BEGIN
    CREATE DATABASE QLSVNhom;
END;
USE QLSVNhom;

-- Tạo bảng nếu chưa tồn tại
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'NHANVIEN' AND xtype = 'U')
BEGIN
    CREATE TABLE NHANVIEN (
        MANV VARCHAR(20) PRIMARY KEY,       
        HOTEN NVARCHAR(100) NOT NULL,       
        EMAIL VARCHAR(100),                 
        LUONG VARBINARY(255),             
        TENDN NVARCHAR(100) NOT NULL,       
        MATKHAU VARBINARY(255) NOT NULL,    
        PUBKEY VARCHAR(255)                 
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'LOP' AND xtype = 'U')
BEGIN
    CREATE TABLE LOP (
        MALOP VARCHAR(20) PRIMARY KEY,     
        TENLOP NVARCHAR(100) NOT NULL,     
        MANV VARCHAR(20),               
        CONSTRAINT FK_Lop_NhanVien FOREIGN KEY (MANV) REFERENCES NHANVIEN (MANV)
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'SINHVIEN' AND xtype = 'U')
BEGIN
    CREATE TABLE SINHVIEN (
        MASV NVARCHAR(20) PRIMARY KEY,      
        HOTEN NVARCHAR(100) NOT NULL,       
        NGAYSINH DATETIME,                
        DIACHI NVARCHAR(200),              
        MALOP VARCHAR(20),               
        TENDN NVARCHAR(100) NOT NULL,     
        MATKHAU VARBINARY(255) NOT NULL,    
        CONSTRAINT FK_SinhVien_Lop FOREIGN KEY (MALOP) REFERENCES LOP (MALOP) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'HOCPHAN' AND xtype = 'U')
BEGIN
    CREATE TABLE HOCPHAN (
        MAHP VARCHAR(20) PRIMARY KEY,       
        TENHP NVARCHAR(100) NOT NULL,       
        SOTC INT NOT NULL                   
    );
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'BANGDIEM' AND xtype = 'U')
BEGIN
    CREATE TABLE BANGDIEM (
        MASV VARCHAR(20),                
        MAHP VARCHAR(20),                   
        DIEMTHI VARBINARY(255),            
        PRIMARY KEY (MASV, MAHP),           
        CONSTRAINT FK_BangDiem_SinhVien FOREIGN KEY (MASV) REFERENCES SINHVIEN (MASV) ON DELETE CASCADE,
        CONSTRAINT FK_BangDiem_HocPhan FOREIGN KEY (MAHP) REFERENCES HOCPHAN (MAHP) ON DELETE CASCADE
    );
END;

-- Tạo Stored Procedure nếu chưa tồn tại
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'SP_INS_PUBLIC_ENCRYPT_NHANVIEN' AND xtype = 'P')
BEGIN
    EXEC('
    CREATE PROCEDURE SP_INS_PUBLIC_ENCRYPT_NHANVIEN
        @MANV NVARCHAR(20),
        @HOTEN NVARCHAR(100),
        @EMAIL NVARCHAR(100),
        @LUONG VARBINARY(MAX),
        @TENDN NVARCHAR(100),
        @MK VARBINARY(MAX), 
        @PUB NVARCHAR(255)  
    AS
    BEGIN
        BEGIN TRY
            BEGIN TRANSACTION;

            INSERT INTO NHANVIEN (MANV, HOTEN, EMAIL, LUONG, TENDN, MATKHAU, PUBKEY)
            VALUES (
                @MANV, 
                @HOTEN, 
                @EMAIL, 
                @LUONG, 
                @TENDN, 
                @MK,   
                @PUB   
            );

            COMMIT TRANSACTION;
        END TRY
        BEGIN CATCH
            ROLLBACK TRANSACTION;
            THROW;
        END CATCH
    END;
    ')
END;

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'SP_SEL_PUBLIC_ENCRYPT_NHANVIEN' AND xtype = 'P')
BEGIN
    EXEC('
    CREATE PROCEDURE SP_SEL_PUBLIC_ENCRYPT_NHANVIEN
        @TENDN NVARCHAR(100),
        @MK VARBINARY(MAX) 
    AS
    BEGIN
        BEGIN TRY
            SELECT 
                MANV, 
                HOTEN, 
                EMAIL, 
                LUONG 
            FROM 
                NHANVIEN
            WHERE 
                TENDN = @TENDN 
                AND MATKHAU = @MK; 
        END TRY
        BEGIN CATCH
            THROW;
        END CATCH
    END;
    ')
END;
