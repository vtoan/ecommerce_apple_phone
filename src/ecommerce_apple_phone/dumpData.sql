INSERT INTO Infos
    (
    [NameStore]
    ,[Logo]
    ,[Email]
    ,[Facebook]
    ,[Messenger]
    ,[Instargram]
    ,[Phone]
    ,[Address]
    ,[WorkTime]
    ,[SeoImage]
    ,[SeoTitle]
    ,[SeoDescription]
    )
VALUES
    ( 'homer', 'icon.ico', 'dangtoan030@gmail.com', 'fb.com/dangviettoan99', 'fb.com', 'instargram.com', '0768042216', '123 Nguyen Tri Phuong, P.8, Q.10, TP.HCM'
    , '9h-18h00', 'image_seo/home.png', '', ''
)

INSERT INTO Fees
    ([Name]
    ,[Cost])
VALUES('Van chuyen', 3000),
    ('Tax', 0.1)

INSERT INTO Categories 
([Name] ,[SeoImage])
VALUES('Iphone','image_seo/iphone.png'), ('Watch','image_seo/watch.png'),('Other','image_seo/other.png') 


INSERT INTO MethodPays ([Name])
VALUES ('Cash'),('Paypal')

INSERT INTO ProductDetails (
    [Name]
      ,[Screen]
      ,[FontCamera]
      ,[RearCamera]
      ,[OperationSystem]
      ,[Chipset]
      ,[ROM]
      ,[RAM]
      ,[Connector]
      ,[Parameter]
      ,[Weight]
      ,[Battery]
      ,[FunctionOther]
      ,[CategoryId]
)
VALUES('Iphone 12 Pro Max',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',1
),
('Iphone 12 Pro',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',1
),
('Iphone 12 Mini',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',1
),
('Iphone 11 Pro Max',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',1
),
('Iphone 11 Pro',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',1
),
('Iphone X Pro',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',1
),
('Iphone X Pro Max',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',1
),
('Iphone 8',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',1
),
('Iphone 8 Plus',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',1
),
('Iphone 7s',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',1
),
('Iphone 7 Plus',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',1
),
('Iphone 6s Plus',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',1
)

INSERT INTO ProductDetails (
    [Name]
      ,[Screen]
      ,[FontCamera]
      ,[RearCamera]
      ,[OperationSystem]
      ,[Chipset]
      ,[ROM]
      ,[RAM]
      ,[Connector]
      ,[Parameter]
      ,[Weight]
      ,[Battery]
      ,[FunctionOther]
      ,[CategoryId]
)
VALUES('Apple Watch SE',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',2
),
('Apple Watch 6',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',2
),
('Apple Watch 5',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',2
),
('Apple Watch 4',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',2
),
('Apple Watch 3',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',2
),
('Apple Watch 2',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',2
),
('Apple Watch',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',2
)

INSERT INTO ProductDetails (
    [Name]
      ,[Screen]
      ,[FontCamera]
      ,[RearCamera]
      ,[OperationSystem]
      ,[Chipset]
      ,[ROM]
      ,[RAM]
      ,[Connector]
      ,[Parameter]
      ,[Weight]
      ,[Battery]
      ,[FunctionOther]
      ,[CategoryId]
)
VALUES('Ipop',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',3
),
('Ipop pro',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',3
),
('Ipop air',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',3
),
('Ipop 2',N'Super Retina XDR OLED 6.7” FullHD+ ,16 triệu màu',N'12 MP f/2.2 , SL 3D',N'12 MP & 12MP và 12MP và TOF 3D LiDAR','IOS 14',N'Apple A14 Bionic (5 nm+) - Apple GPU 4 nhân',
'128GB','6GB',N'Mạng di động: Hỗ trợ 5G;Wifi: Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot;Bluetooth: 5.0, A2DP, LE;Cổng kết nối/sạc: Lightning, USB 2.0','160.8 x 78.1 x 7.4 mm','228g','3500mA',
'Full',3
)


INSERT INTO Products (
    [Price]
      ,[Color]
      ,[SaleCount]
      ,[Images]
      ,[Quantity]
      ,[ProductDetailId]
)
VALUES 
(25000000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 1),
(35000000,'Bule',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 1),
(27000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 1),
(32000000,'Blue',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 2),
(33000000,'REad',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 2),
(36000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 2),
(21000000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 3),
(22000000,'Black',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 3),
(23000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 3),
(17000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 4),
(12000000,'Blue',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 4),
(15000000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 4),
(22000000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10,5),
(26000000,'Blue',0,'["product/product1.png","product/product2.png","product/producte.png"]',10,5),
(21000000,'Gold',0,'["product/product1.png","product/product2.png","product/producte.png"]',10,5),
(12000000,'GOld',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 6),
(13000000,'PInk',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 6),
(14000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 6),
(6000000,'ORGARN',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 7),
(5200000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 7),
(5500000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 7),
(6000000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 8),
(6000000,'Gold',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 8),
(6000000,'Pink',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 8),
(2000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 9),
(2000000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 10),
(3000000,'Blue',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 11),
(2000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 12)

INSERT INTO Products (
    [Price]
      ,[Color]
      ,[SaleCount]
      ,[Images]
      ,[Quantity]
      ,[ProductDetailId]
)
VALUES 
(25000000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 13),
(36000000,'Blue',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 14),
(22000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 15),
(15000000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 16),
(26000000,'Blue',0,'["product/product1.png","product/product2.png","product/producte.png"]',10,17),
(12000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 18),
(5000000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 19)

INSERT INTO Products (
    [Price]
      ,[Color]
      ,[SaleCount]
      ,[Images]
      ,[Quantity]
      ,[ProductDetailId]
)
VALUES 
(6000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 20),
(2000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 21),
(2000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 22),
(3000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 23)

-- Insert rows into table 'TableName' ProductDetails
