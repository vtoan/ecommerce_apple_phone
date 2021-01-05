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
VALUES('Shipping', 30000),
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
    [Id],
    [Price]
      ,[Color]
      ,[SaleCount]
      ,[Images]
      ,[Quantity]
      ,[ProductDetailId]
)
VALUES 
('1A12',25000000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 1),
('1A13',35000000,'Bule',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 1),
('1A14',27000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 1),
('2A11',32000000,'Blue',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 2),
('2A12',33000000,'REad',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 2),
('2A13',36000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 2),
('3A12',21000000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 3),
('3A11',22000000,'Black',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 3),
('3A13',23000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 3),
('4A13',17000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 4),
('4A12',12000000,'Blue',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 4),
('4A11',15000000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 4),
('5A12',22000000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10,5),
('5A11',26000000,'Blue',0,'["product/product1.png","product/product2.png","product/producte.png"]',10,5),
('5A13',21000000,'Gold',0,'["product/product1.png","product/product2.png","product/producte.png"]',10,5),
('6A11',12000000,'GOld',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 6),
('6A12',13000000,'PInk',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 6),
('6A13',14000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 6),
('7A12',6000000,'ORGARN',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 7),
('7A11',5200000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 7),
('7A13',5500000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 7),
('8A13',6000000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 8),
('8A12',6000000,'Gold',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 8),
('8A11',6000000,'Pink',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 8),
('9A13',2000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 9),
('10A11',2000000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 10),
('11A12',3000000,'Blue',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 11),
('12A12',2000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 12)

INSERT INTO Products (
    [Id],
    [Price]
      ,[Color]
      ,[SaleCount]
      ,[Images]
      ,[Quantity]
      ,[ProductDetailId]
)
VALUES 
('13A11',25000000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 13),
('14A11',36000000,'Blue',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 14),
('15A11',22000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 15),
('16A11',15000000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 16),
('17A11',26000000,'Blue',0,'["product/product1.png","product/product2.png","product/producte.png"]',10,17),
('18A11',12000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 18),
('19A11',5000000,'Red',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 19)

INSERT INTO Products (
    [Id],
    [Price]
      ,[Color]
      ,[SaleCount]
      ,[Images]
      ,[Quantity]
      ,[ProductDetailId]
)
VALUES 
('20A11',6000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 20),
('21A11',2000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 21),
('22A11',2000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 22),
('23A11',3000000,'White',0,'["product/product1.png","product/product2.png","product/producte.png"]',10, 23)

-- Insert rows into table 'TableName' ProductDetails
