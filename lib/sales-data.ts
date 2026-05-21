export type PaymentMethod = "Credit Card" | "eWallet" | "Cash" | "Debit Card";

export interface SaleRow {
  orderId: string;
  date: string; // "YYYY-MM-DD"
  product: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  customerLocation: string;
}

export const salesData: SaleRow[] = [
  { orderId: "TT-1001", date: "2025-08-15", product: "Classic White Tee", category: "T-Shirts", quantity: 2, unitPrice: 29.99, totalPrice: 59.98, paymentMethod: "Credit Card", customerLocation: "New York" },
  { orderId: "TT-1002", date: "2025-08-15", product: "Slim Fit Jeans", category: "Bottoms", quantity: 1, unitPrice: 79.99, totalPrice: 79.99, paymentMethod: "eWallet", customerLocation: "Los Angeles" },
  { orderId: "TT-1003", date: "2025-08-16", product: "Floral Summer Dress", category: "Dresses", quantity: 1, unitPrice: 89.99, totalPrice: 89.99, paymentMethod: "Cash", customerLocation: "Chicago" },
  { orderId: "TT-1004", date: "2025-08-16", product: "Leather Jacket", category: "Outerwear", quantity: 1, unitPrice: 175.00, totalPrice: 175.00, paymentMethod: "Credit Card", customerLocation: "Houston" },
  { orderId: "TT-1005", date: "2025-08-17", product: "Classic White Tee", category: "T-Shirts", quantity: 3, unitPrice: 29.99, totalPrice: 89.97, paymentMethod: "Debit Card", customerLocation: "Phoenix" },
  { orderId: "TT-1006", date: "2025-08-17", product: "Yoga Pants", category: "Activewear", quantity: 2, unitPrice: 65.00, totalPrice: 130.00, paymentMethod: "eWallet", customerLocation: "Philadelphia" },
  { orderId: "TT-1007", date: "2025-08-18", product: "Wool Sweater", category: "Tops", quantity: 1, unitPrice: 95.00, totalPrice: 95.00, paymentMethod: "Credit Card", customerLocation: "San Antonio" },
  { orderId: "TT-1008", date: "2025-08-18", product: "Slim Fit Jeans", category: "Bottoms", quantity: 2, unitPrice: 79.99, totalPrice: 159.98, paymentMethod: "Cash", customerLocation: "San Diego" },
  { orderId: "TT-1009", date: "2025-08-19", product: "Floral Summer Dress", category: "Dresses", quantity: 1, unitPrice: 89.99, totalPrice: 89.99, paymentMethod: "Credit Card", customerLocation: "Dallas" },
  { orderId: "TT-1010", date: "2025-08-19", product: "Running Shorts", category: "Activewear", quantity: 2, unitPrice: 45.00, totalPrice: 90.00, paymentMethod: "eWallet", customerLocation: "San Jose" },
  { orderId: "TT-1011", date: "2025-08-20", product: "Linen Blazer", category: "Outerwear", quantity: 1, unitPrice: 145.00, totalPrice: 145.00, paymentMethod: "Credit Card", customerLocation: "Austin" },
  { orderId: "TT-1012", date: "2025-08-20", product: "Classic White Tee", category: "T-Shirts", quantity: 4, unitPrice: 29.99, totalPrice: 119.96, paymentMethod: "Debit Card", customerLocation: "Jacksonville" },
  { orderId: "TT-1013", date: "2025-08-21", product: "Slim Fit Jeans", category: "Bottoms", quantity: 1, unitPrice: 79.99, totalPrice: 79.99, paymentMethod: "Cash", customerLocation: "Fort Worth" },
  { orderId: "TT-1014", date: "2025-08-21", product: "Yoga Pants", category: "Activewear", quantity: 1, unitPrice: 65.00, totalPrice: 65.00, paymentMethod: "eWallet", customerLocation: "Columbus" },
  { orderId: "TT-1015", date: "2025-08-22", product: "Wool Sweater", category: "Tops", quantity: 2, unitPrice: 95.00, totalPrice: 190.00, paymentMethod: "Credit Card", customerLocation: "Charlotte" },
  { orderId: "TT-1016", date: "2025-08-22", product: "Graphic Print Tee", category: "T-Shirts", quantity: 3, unitPrice: 34.99, totalPrice: 104.97, paymentMethod: "Debit Card", customerLocation: "Indianapolis" },
  { orderId: "TT-1017", date: "2025-08-23", product: "Floral Summer Dress", category: "Dresses", quantity: 2, unitPrice: 89.99, totalPrice: 179.98, paymentMethod: "Credit Card", customerLocation: "San Francisco" },
  { orderId: "TT-1018", date: "2025-08-23", product: "Leather Jacket", category: "Outerwear", quantity: 1, unitPrice: 175.00, totalPrice: 175.00, paymentMethod: "eWallet", customerLocation: "Seattle" },
  { orderId: "TT-1019", date: "2025-08-24", product: "Running Shorts", category: "Activewear", quantity: 3, unitPrice: 45.00, totalPrice: 135.00, paymentMethod: "Cash", customerLocation: "Denver" },
  { orderId: "TT-1020", date: "2025-08-24", product: "Slim Fit Jeans", category: "Bottoms", quantity: 1, unitPrice: 79.99, totalPrice: 79.99, paymentMethod: "Credit Card", customerLocation: "Nashville" },
  { orderId: "TT-1021", date: "2025-08-25", product: "Classic White Tee", category: "T-Shirts", quantity: 2, unitPrice: 29.99, totalPrice: 59.98, paymentMethod: "Debit Card", customerLocation: "Oklahoma City" },
  { orderId: "TT-1022", date: "2025-08-25", product: "Linen Blazer", category: "Outerwear", quantity: 1, unitPrice: 145.00, totalPrice: 145.00, paymentMethod: "Credit Card", customerLocation: "El Paso" },
  { orderId: "TT-1023", date: "2025-08-26", product: "Yoga Pants", category: "Activewear", quantity: 2, unitPrice: 65.00, totalPrice: 130.00, paymentMethod: "eWallet", customerLocation: "Las Vegas" },
  { orderId: "TT-1024", date: "2025-08-26", product: "Graphic Print Tee", category: "T-Shirts", quantity: 1, unitPrice: 34.99, totalPrice: 34.99, paymentMethod: "Cash", customerLocation: "Louisville" },
  { orderId: "TT-1025", date: "2025-08-27", product: "Wool Sweater", category: "Tops", quantity: 1, unitPrice: 95.00, totalPrice: 95.00, paymentMethod: "Credit Card", customerLocation: "Portland" },
  { orderId: "TT-1026", date: "2025-08-27", product: "Floral Summer Dress", category: "Dresses", quantity: 1, unitPrice: 89.99, totalPrice: 89.99, paymentMethod: "Debit Card", customerLocation: "Baltimore" },
  { orderId: "TT-1027", date: "2025-08-28", product: "Running Shorts", category: "Activewear", quantity: 2, unitPrice: 45.00, totalPrice: 90.00, paymentMethod: "eWallet", customerLocation: "Milwaukee" },
  { orderId: "TT-1028", date: "2025-08-28", product: "Slim Fit Jeans", category: "Bottoms", quantity: 2, unitPrice: 79.99, totalPrice: 159.98, paymentMethod: "Credit Card", customerLocation: "Albuquerque" },
  { orderId: "TT-1029", date: "2025-08-29", product: "Cargo Pants", category: "Bottoms", quantity: 1, unitPrice: 85.00, totalPrice: 85.00, paymentMethod: "Cash", customerLocation: "Tucson" },
  { orderId: "TT-1030", date: "2025-08-29", product: "Classic White Tee", category: "T-Shirts", quantity: 3, unitPrice: 29.99, totalPrice: 89.97, paymentMethod: "Credit Card", customerLocation: "Fresno" },
  { orderId: "TT-1031", date: "2025-08-30", product: "Leather Jacket", category: "Outerwear", quantity: 1, unitPrice: 175.00, totalPrice: 175.00, paymentMethod: "eWallet", customerLocation: "Sacramento" },
  { orderId: "TT-1032", date: "2025-08-30", product: "Graphic Print Tee", category: "T-Shirts", quantity: 2, unitPrice: 34.99, totalPrice: 69.98, paymentMethod: "Debit Card", customerLocation: "Mesa" },
  { orderId: "TT-1033", date: "2025-08-31", product: "Yoga Pants", category: "Activewear", quantity: 1, unitPrice: 65.00, totalPrice: 65.00, paymentMethod: "Credit Card", customerLocation: "Kansas City" },
  { orderId: "TT-1034", date: "2025-08-31", product: "Linen Blazer", category: "Outerwear", quantity: 1, unitPrice: 145.00, totalPrice: 145.00, paymentMethod: "Cash", customerLocation: "Atlanta" },
  { orderId: "TT-1035", date: "2025-09-01", product: "Slim Fit Jeans", category: "Bottoms", quantity: 1, unitPrice: 79.99, totalPrice: 79.99, paymentMethod: "Credit Card", customerLocation: "Omaha" },
  { orderId: "TT-1036", date: "2025-09-01", product: "Classic White Tee", category: "T-Shirts", quantity: 2, unitPrice: 29.99, totalPrice: 59.98, paymentMethod: "eWallet", customerLocation: "Colorado Springs" },
  { orderId: "TT-1037", date: "2025-09-02", product: "Floral Summer Dress", category: "Dresses", quantity: 1, unitPrice: 89.99, totalPrice: 89.99, paymentMethod: "Debit Card", customerLocation: "Raleigh" },
  { orderId: "TT-1038", date: "2025-09-02", product: "Running Shorts", category: "Activewear", quantity: 3, unitPrice: 45.00, totalPrice: 135.00, paymentMethod: "Credit Card", customerLocation: "Long Beach" },
  { orderId: "TT-1039", date: "2025-09-03", product: "Wool Sweater", category: "Tops", quantity: 2, unitPrice: 95.00, totalPrice: 190.00, paymentMethod: "eWallet", customerLocation: "Virginia Beach" },
  { orderId: "TT-1040", date: "2025-09-03", product: "Cargo Pants", category: "Bottoms", quantity: 1, unitPrice: 85.00, totalPrice: 85.00, paymentMethod: "Cash", customerLocation: "Minneapolis" },
  { orderId: "TT-1041", date: "2025-09-04", product: "Graphic Print Tee", category: "T-Shirts", quantity: 4, unitPrice: 34.99, totalPrice: 139.96, paymentMethod: "Credit Card", customerLocation: "Tampa" },
  { orderId: "TT-1042", date: "2025-09-04", product: "Leather Jacket", category: "Outerwear", quantity: 1, unitPrice: 175.00, totalPrice: 175.00, paymentMethod: "Debit Card", customerLocation: "New Orleans" },
  { orderId: "TT-1043", date: "2025-09-05", product: "Slim Fit Jeans", category: "Bottoms", quantity: 2, unitPrice: 79.99, totalPrice: 159.98, paymentMethod: "eWallet", customerLocation: "Arlington" },
  { orderId: "TT-1044", date: "2025-09-05", product: "Yoga Pants", category: "Activewear", quantity: 1, unitPrice: 65.00, totalPrice: 65.00, paymentMethod: "Credit Card", customerLocation: "Bakersfield" },
  { orderId: "TT-1045", date: "2025-09-06", product: "Classic White Tee", category: "T-Shirts", quantity: 3, unitPrice: 29.99, totalPrice: 89.97, paymentMethod: "Cash", customerLocation: "Honolulu" },
  { orderId: "TT-1046", date: "2025-09-06", product: "Linen Blazer", category: "Outerwear", quantity: 2, unitPrice: 145.00, totalPrice: 290.00, paymentMethod: "Credit Card", customerLocation: "Anaheim" },
  { orderId: "TT-1047", date: "2025-09-07", product: "Floral Summer Dress", category: "Dresses", quantity: 1, unitPrice: 89.99, totalPrice: 89.99, paymentMethod: "eWallet", customerLocation: "Aurora" },
  { orderId: "TT-1048", date: "2025-09-07", product: "Wool Sweater", category: "Tops", quantity: 1, unitPrice: 95.00, totalPrice: 95.00, paymentMethod: "Debit Card", customerLocation: "Santa Ana" },
  { orderId: "TT-1049", date: "2025-09-08", product: "Running Shorts", category: "Activewear", quantity: 2, unitPrice: 45.00, totalPrice: 90.00, paymentMethod: "Credit Card", customerLocation: "Corpus Christi" },
  { orderId: "TT-1050", date: "2025-09-08", product: "Cargo Pants", category: "Bottoms", quantity: 1, unitPrice: 85.00, totalPrice: 85.00, paymentMethod: "Cash", customerLocation: "Riverside" },
  { orderId: "TT-1051", date: "2025-09-09", product: "Graphic Print Tee", category: "T-Shirts", quantity: 2, unitPrice: 34.99, totalPrice: 69.98, paymentMethod: "eWallet", customerLocation: "Lexington" },
  { orderId: "TT-1052", date: "2025-09-09", product: "Leather Jacket", category: "Outerwear", quantity: 1, unitPrice: 175.00, totalPrice: 175.00, paymentMethod: "Credit Card", customerLocation: "St. Louis" },
  { orderId: "TT-1053", date: "2025-09-10", product: "Slim Fit Jeans", category: "Bottoms", quantity: 1, unitPrice: 79.99, totalPrice: 79.99, paymentMethod: "Debit Card", customerLocation: "Pittsburgh" },
  { orderId: "TT-1054", date: "2025-09-10", product: "Classic White Tee", category: "T-Shirts", quantity: 2, unitPrice: 29.99, totalPrice: 59.98, paymentMethod: "Credit Card", customerLocation: "Anchorage" },
  { orderId: "TT-1055", date: "2025-09-11", product: "Yoga Pants", category: "Activewear", quantity: 3, unitPrice: 65.00, totalPrice: 195.00, paymentMethod: "eWallet", customerLocation: "Stockton" },
  { orderId: "TT-1056", date: "2025-09-11", product: "Floral Summer Dress", category: "Dresses", quantity: 1, unitPrice: 89.99, totalPrice: 89.99, paymentMethod: "Cash", customerLocation: "Cincinnati" },
  { orderId: "TT-1057", date: "2025-09-12", product: "Linen Blazer", category: "Outerwear", quantity: 1, unitPrice: 145.00, totalPrice: 145.00, paymentMethod: "Credit Card", customerLocation: "St. Paul" },
  { orderId: "TT-1058", date: "2025-09-12", product: "Wool Sweater", category: "Tops", quantity: 2, unitPrice: 95.00, totalPrice: 190.00, paymentMethod: "Debit Card", customerLocation: "Greensboro" },
  { orderId: "TT-1059", date: "2025-09-13", product: "Running Shorts", category: "Activewear", quantity: 1, unitPrice: 45.00, totalPrice: 45.00, paymentMethod: "eWallet", customerLocation: "Toledo" },
  { orderId: "TT-1060", date: "2025-09-13", product: "Cargo Pants", category: "Bottoms", quantity: 2, unitPrice: 85.00, totalPrice: 170.00, paymentMethod: "Credit Card", customerLocation: "Newark" },
  { orderId: "TT-1061", date: "2025-09-14", product: "Graphic Print Tee", category: "T-Shirts", quantity: 3, unitPrice: 34.99, totalPrice: 104.97, paymentMethod: "Cash", customerLocation: "Plano" },
  { orderId: "TT-1062", date: "2025-09-14", product: "Classic White Tee", category: "T-Shirts", quantity: 1, unitPrice: 29.99, totalPrice: 29.99, paymentMethod: "Credit Card", customerLocation: "Henderson" },
  { orderId: "TT-1063", date: "2025-09-15", product: "Leather Jacket", category: "Outerwear", quantity: 1, unitPrice: 175.00, totalPrice: 175.00, paymentMethod: "eWallet", customerLocation: "Orlando" },
  { orderId: "TT-1064", date: "2025-09-15", product: "Slim Fit Jeans", category: "Bottoms", quantity: 2, unitPrice: 79.99, totalPrice: 159.98, paymentMethod: "Debit Card", customerLocation: "Chandler" },
  { orderId: "TT-1065", date: "2025-09-16", product: "Yoga Pants", category: "Activewear", quantity: 1, unitPrice: 65.00, totalPrice: 65.00, paymentMethod: "Credit Card", customerLocation: "Laredo" },
  { orderId: "TT-1066", date: "2025-09-16", product: "Floral Summer Dress", category: "Dresses", quantity: 2, unitPrice: 89.99, totalPrice: 179.98, paymentMethod: "Cash", customerLocation: "Madison" },
  { orderId: "TT-1067", date: "2025-09-17", product: "Wool Sweater", category: "Tops", quantity: 1, unitPrice: 95.00, totalPrice: 95.00, paymentMethod: "eWallet", customerLocation: "Durham" },
  { orderId: "TT-1068", date: "2025-09-17", product: "Linen Blazer", category: "Outerwear", quantity: 1, unitPrice: 145.00, totalPrice: 145.00, paymentMethod: "Credit Card", customerLocation: "Lubbock" },
  { orderId: "TT-1069", date: "2025-09-18", product: "Running Shorts", category: "Activewear", quantity: 2, unitPrice: 45.00, totalPrice: 90.00, paymentMethod: "Debit Card", customerLocation: "Garland" },
  { orderId: "TT-1070", date: "2025-09-18", product: "Cargo Pants", category: "Bottoms", quantity: 1, unitPrice: 85.00, totalPrice: 85.00, paymentMethod: "Credit Card", customerLocation: "Akron" },
  { orderId: "TT-1071", date: "2025-09-19", product: "Classic White Tee", category: "T-Shirts", quantity: 4, unitPrice: 29.99, totalPrice: 119.96, paymentMethod: "eWallet", customerLocation: "Hialeah" },
  { orderId: "TT-1072", date: "2025-09-19", product: "Graphic Print Tee", category: "T-Shirts", quantity: 2, unitPrice: 34.99, totalPrice: 69.98, paymentMethod: "Cash", customerLocation: "Reno" },
  { orderId: "TT-1073", date: "2025-09-20", product: "Leather Jacket", category: "Outerwear", quantity: 1, unitPrice: 175.00, totalPrice: 175.00, paymentMethod: "Credit Card", customerLocation: "Baton Rouge" },
  { orderId: "TT-1074", date: "2025-09-20", product: "Slim Fit Jeans", category: "Bottoms", quantity: 1, unitPrice: 79.99, totalPrice: 79.99, paymentMethod: "Debit Card", customerLocation: "Irvine" },
  { orderId: "TT-1075", date: "2025-09-21", product: "Yoga Pants", category: "Activewear", quantity: 2, unitPrice: 65.00, totalPrice: 130.00, paymentMethod: "eWallet", customerLocation: "Birmingham" },
  { orderId: "TT-1076", date: "2025-09-21", product: "Floral Summer Dress", category: "Dresses", quantity: 1, unitPrice: 89.99, totalPrice: 89.99, paymentMethod: "Credit Card", customerLocation: "Rochester" },
  { orderId: "TT-1077", date: "2025-09-22", product: "Wool Sweater", category: "Tops", quantity: 1, unitPrice: 95.00, totalPrice: 95.00, paymentMethod: "Cash", customerLocation: "Richmond" },
  { orderId: "TT-1078", date: "2025-09-22", product: "Cargo Pants", category: "Bottoms", quantity: 2, unitPrice: 85.00, totalPrice: 170.00, paymentMethod: "Credit Card", customerLocation: "Spokane" },
  { orderId: "TT-1079", date: "2025-09-23", product: "Classic White Tee", category: "T-Shirts", quantity: 2, unitPrice: 29.99, totalPrice: 59.98, paymentMethod: "eWallet", customerLocation: "Des Moines" },
  { orderId: "TT-1080", date: "2025-09-23", product: "Linen Blazer", category: "Outerwear", quantity: 1, unitPrice: 145.00, totalPrice: 145.00, paymentMethod: "Debit Card", customerLocation: "Montgomery" },
  { orderId: "TT-1081", date: "2025-09-24", product: "Running Shorts", category: "Activewear", quantity: 3, unitPrice: 45.00, totalPrice: 135.00, paymentMethod: "Credit Card", customerLocation: "Modesto" },
  { orderId: "TT-1082", date: "2025-09-24", product: "Graphic Print Tee", category: "T-Shirts", quantity: 1, unitPrice: 34.99, totalPrice: 34.99, paymentMethod: "Cash", customerLocation: "Shreveport" },
  { orderId: "TT-1083", date: "2025-09-25", product: "Leather Jacket", category: "Outerwear", quantity: 1, unitPrice: 175.00, totalPrice: 175.00, paymentMethod: "Credit Card", customerLocation: "Glendale" },
  { orderId: "TT-1084", date: "2025-09-25", product: "Slim Fit Jeans", category: "Bottoms", quantity: 2, unitPrice: 79.99, totalPrice: 159.98, paymentMethod: "eWallet", customerLocation: "Tacoma" },
  { orderId: "TT-1085", date: "2025-09-26", product: "Yoga Pants", category: "Activewear", quantity: 1, unitPrice: 65.00, totalPrice: 65.00, paymentMethod: "Debit Card", customerLocation: "Tallahassee" },
  { orderId: "TT-1086", date: "2025-09-26", product: "Classic White Tee", category: "T-Shirts", quantity: 3, unitPrice: 29.99, totalPrice: 89.97, paymentMethod: "Credit Card", customerLocation: "Cape Coral" },
  { orderId: "TT-1087", date: "2025-09-27", product: "Floral Summer Dress", category: "Dresses", quantity: 2, unitPrice: 89.99, totalPrice: 179.98, paymentMethod: "eWallet", customerLocation: "Oxnard" },
  { orderId: "TT-1088", date: "2025-09-27", product: "Wool Sweater", category: "Tops", quantity: 1, unitPrice: 95.00, totalPrice: 95.00, paymentMethod: "Cash", customerLocation: "Eugene" },
  { orderId: "TT-1089", date: "2025-09-28", product: "Cargo Pants", category: "Bottoms", quantity: 1, unitPrice: 85.00, totalPrice: 85.00, paymentMethod: "Credit Card", customerLocation: "Peoria" },
  { orderId: "TT-1090", date: "2025-09-28", product: "Linen Blazer", category: "Outerwear", quantity: 1, unitPrice: 145.00, totalPrice: 145.00, paymentMethod: "Debit Card", customerLocation: "Elk Grove" },
  { orderId: "TT-1091", date: "2025-09-29", product: "Running Shorts", category: "Activewear", quantity: 2, unitPrice: 45.00, totalPrice: 90.00, paymentMethod: "eWallet", customerLocation: "Salem" },
  { orderId: "TT-1092", date: "2025-09-29", product: "Graphic Print Tee", category: "T-Shirts", quantity: 3, unitPrice: 34.99, totalPrice: 104.97, paymentMethod: "Credit Card", customerLocation: "Palmdale" },
  { orderId: "TT-1093", date: "2025-09-30", product: "Classic White Tee", category: "T-Shirts", quantity: 1, unitPrice: 29.99, totalPrice: 29.99, paymentMethod: "Cash", customerLocation: "Springfield" },
  { orderId: "TT-1094", date: "2025-09-30", product: "Leather Jacket", category: "Outerwear", quantity: 1, unitPrice: 175.00, totalPrice: 175.00, paymentMethod: "Credit Card", customerLocation: "Fort Collins" },
  { orderId: "TT-1095", date: "2025-10-01", product: "Slim Fit Jeans", category: "Bottoms", quantity: 2, unitPrice: 79.99, totalPrice: 159.98, paymentMethod: "eWallet", customerLocation: "Clarksville" },
  { orderId: "TT-1096", date: "2025-10-01", product: "Yoga Pants", category: "Activewear", quantity: 1, unitPrice: 65.00, totalPrice: 65.00, paymentMethod: "Debit Card", customerLocation: "Lakewood" },
  { orderId: "TT-1097", date: "2025-10-02", product: "Floral Summer Dress", category: "Dresses", quantity: 1, unitPrice: 89.99, totalPrice: 89.99, paymentMethod: "Credit Card", customerLocation: "Hayward" },
  { orderId: "TT-1098", date: "2025-10-02", product: "Wool Sweater", category: "Tops", quantity: 2, unitPrice: 95.00, totalPrice: 190.00, paymentMethod: "Cash", customerLocation: "Alexandria" },
  { orderId: "TT-1099", date: "2025-10-03", product: "Cargo Pants", category: "Bottoms", quantity: 1, unitPrice: 85.00, totalPrice: 85.00, paymentMethod: "Credit Card", customerLocation: "Sunnyvale" },
  { orderId: "TT-1100", date: "2025-10-03", product: "Graphic Print Tee", category: "T-Shirts", quantity: 2, unitPrice: 34.99, totalPrice: 69.98, paymentMethod: "eWallet", customerLocation: "Salinas" },
  { orderId: "TT-1101", date: "2025-10-04", product: "Classic White Tee", category: "T-Shirts", quantity: 3, unitPrice: 29.99, totalPrice: 89.97, paymentMethod: "Debit Card", customerLocation: "Pomona" },
  { orderId: "TT-1102", date: "2025-10-04", product: "Linen Blazer", category: "Outerwear", quantity: 1, unitPrice: 145.00, totalPrice: 145.00, paymentMethod: "Credit Card", customerLocation: "Escondido" },
  { orderId: "TT-1103", date: "2025-10-05", product: "Leather Jacket", category: "Outerwear", quantity: 1, unitPrice: 175.00, totalPrice: 175.00, paymentMethod: "Cash", customerLocation: "Torrance" },
  { orderId: "TT-1104", date: "2025-10-05", product: "Running Shorts", category: "Activewear", quantity: 2, unitPrice: 45.00, totalPrice: 90.00, paymentMethod: "eWallet", customerLocation: "Roseville" },
  { orderId: "TT-1105", date: "2025-10-06", product: "Slim Fit Jeans", category: "Bottoms", quantity: 1, unitPrice: 79.99, totalPrice: 79.99, paymentMethod: "Credit Card", customerLocation: "Paterson" },
  { orderId: "TT-1106", date: "2025-10-06", product: "Yoga Pants", category: "Activewear", quantity: 3, unitPrice: 65.00, totalPrice: 195.00, paymentMethod: "Debit Card", customerLocation: "Surprise" },
  { orderId: "TT-1107", date: "2025-10-07", product: "Floral Summer Dress", category: "Dresses", quantity: 1, unitPrice: 89.99, totalPrice: 89.99, paymentMethod: "Credit Card", customerLocation: "Bridgeport" },
  { orderId: "TT-1108", date: "2025-10-07", product: "Wool Sweater", category: "Tops", quantity: 1, unitPrice: 95.00, totalPrice: 95.00, paymentMethod: "eWallet", customerLocation: "Naperville" },
  { orderId: "TT-1109", date: "2025-10-07", product: "Cargo Pants", category: "Bottoms", quantity: 2, unitPrice: 85.00, totalPrice: 170.00, paymentMethod: "Cash", customerLocation: "Savannah" },
  { orderId: "TT-1110", date: "2025-10-07", product: "Classic White Tee", category: "T-Shirts", quantity: 2, unitPrice: 29.99, totalPrice: 59.98, paymentMethod: "Credit Card", customerLocation: "Jackson" },
  { orderId: "TT-1111", date: "2025-10-07", product: "Graphic Print Tee", category: "T-Shirts", quantity: 1, unitPrice: 34.99, totalPrice: 34.99, paymentMethod: "eWallet", customerLocation: "Warren" },
  { orderId: "TT-1112", date: "2025-10-07", product: "Linen Blazer", category: "Outerwear", quantity: 1, unitPrice: 145.00, totalPrice: 145.00, paymentMethod: "Debit Card", customerLocation: "Hollywood" },
  { orderId: "TT-1113", date: "2025-10-07", product: "Leather Jacket", category: "Outerwear", quantity: 1, unitPrice: 175.00, totalPrice: 175.00, paymentMethod: "Credit Card", customerLocation: "Macon" },
  { orderId: "TT-1114", date: "2025-10-07", product: "Running Shorts", category: "Activewear", quantity: 2, unitPrice: 45.00, totalPrice: 90.00, paymentMethod: "Cash", customerLocation: "Knoxville" },
  { orderId: "TT-1115", date: "2025-10-07", product: "Slim Fit Jeans", category: "Bottoms", quantity: 1, unitPrice: 79.99, totalPrice: 79.99, paymentMethod: "eWallet", customerLocation: "Syracuse" },
  { orderId: "TT-1116", date: "2025-10-07", product: "Yoga Pants", category: "Activewear", quantity: 1, unitPrice: 65.00, totalPrice: 65.00, paymentMethod: "Credit Card", customerLocation: "Chattanooga" },
];

export type TimePeriod = "all" | "30d" | "14d";

export function applyFilters(
  data: SaleRow[],
  period: TimePeriod,
  payment: PaymentMethod | "all"
): SaleRow[] {
  let filtered = data;

  if (period !== "all") {
    const days = period === "30d" ? 30 : 14;
    const cutoff = new Date("2025-10-07");
    cutoff.setDate(cutoff.getDate() - days + 1);
    const cutoffStr = cutoff.toISOString().split("T")[0];
    filtered = filtered.filter((r) => r.date >= cutoffStr);
  }

  if (payment !== "all") {
    filtered = filtered.filter((r) => r.paymentMethod === payment);
  }

  return filtered;
}

export interface KPIs {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  bestSellingProduct: string;
  bestSellingRevenue: number;
}

export function computeKPIs(data: SaleRow[]): KPIs {
  const totalRevenue = data.reduce((s, r) => s + r.totalPrice, 0);
  const totalOrders = new Set(data.map((r) => r.orderId)).size;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const byProduct: Record<string, number> = {};
  data.forEach((r) => {
    byProduct[r.product] = (byProduct[r.product] ?? 0) + r.totalPrice;
  });
  const bestSellingProduct = Object.entries(byProduct).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
  const bestSellingRevenue = byProduct[bestSellingProduct] ?? 0;

  return { totalRevenue, totalOrders, avgOrderValue, bestSellingProduct, bestSellingRevenue };
}

export interface DailyRevenue {
  date: string;  // "Aug 15"
  revenue: number;
}

export function getRevenueByDay(data: SaleRow[]): DailyRevenue[] {
  const byDate: Record<string, number> = {};
  data.forEach((r) => {
    byDate[r.date] = (byDate[r.date] ?? 0) + r.totalPrice;
  });
  return Object.entries(byDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, revenue]) => ({
      date: new Date(date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      revenue: Math.round(revenue * 100) / 100,
    }));
}

export interface ProductStat {
  product: string;
  revenue: number;
  units: number;
}

export function getProductStats(data: SaleRow[]): ProductStat[] {
  const map: Record<string, ProductStat> = {};
  data.forEach((r) => {
    if (!map[r.product]) map[r.product] = { product: r.product, revenue: 0, units: 0 };
    map[r.product].revenue += r.totalPrice;
    map[r.product].units += r.quantity;
  });
  return Object.values(map).sort((a, b) => b.revenue - a.revenue);
}

export interface PaymentStat {
  name: PaymentMethod;
  value: number;
  revenue: number;
}

export function getPaymentStats(data: SaleRow[]): PaymentStat[] {
  const map: Record<string, PaymentStat> = {};
  data.forEach((r) => {
    if (!map[r.paymentMethod]) map[r.paymentMethod] = { name: r.paymentMethod, value: 0, revenue: 0 };
    map[r.paymentMethod].value += 1;
    map[r.paymentMethod].revenue += r.totalPrice;
  });
  return Object.values(map).sort((a, b) => b.revenue - a.revenue);
}
