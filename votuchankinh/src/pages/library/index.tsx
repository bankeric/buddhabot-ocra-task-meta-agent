'use client'

import { useState, useEffect, useRef } from 'react'

interface SutraContent {
  id: string
  title: string
  content: string
  date?: string
  author?: string
}

export default function LibraryPage() {
  const [language, setLanguage] = useState<'vi' | 'en'>('vi')
  const [selectedSutraItem, setSelectedSutraItem] = useState<string>('')
  const [expandedSection, setExpandedSection] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  // const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false)
  const [selectedResultIndex, setSelectedResultIndex] = useState<number>(-1)

  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false)
        setSelectedResultIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'vi' ? 'en' : 'vi'))
  }

  const translations = {
    vi: {
      returnToHome: 'Trở về Trang Chủ',
      library: 'THƯ VIỆN',
      subtitle: 'Kho Tàng Tri Thức và Trí Tuệ',
      tableOfContents: 'Mục Lục',
      selectContent: 'Chọn một mục để đọc nội dung',
    },
    en: {
      returnToHome: 'Return to Home',
      library: 'LIBRARY',
      subtitle: 'Treasury of Knowledge and Wisdom',
      tableOfContents: 'Table of Contents',
      selectContent: 'Select a section to read content',
    },
  }

  const tocData = [
    {
      id: 'section-01-tam-vo',
      title: '1. Tam Vô',
      items: [
        { id: 'section-01-01-tam-vo', title: 'Tam Vô' },
        { id: 'section-01-02-vo-tu-nga', title: 'Vô Tự Ngã' },
        { id: 'section-01-03-vo-tuong', title: 'Vô Tướng' },
        { id: 'section-01-04-vo-niem', title: 'Vô Niệm' },
        { id: 'section-01-05-tam-vo-dai-nguyen', title: 'Tam Vô Đại Nguyện' },
        { id: 'section-01-06-tam-vo-hang-nhat', title: 'Tam Vô Hằng Nhật' },
      ],
    },
    {
      id: 'section-02-gioi-luat',
      title: '2. Giới Luật',
      items: [
        { id: 'section-02-01-ton-chi', title: 'Tôn Chỉ' },
        { id: 'section-02-02-gioi-qui', title: 'Giới Qui' },
        { id: 'section-02-03-cuong-linh', title: 'Cương Lĩnh' },
      ],
    },
    {
      id: 'section-03-tim-dao',
      title: '3. Tìm Đạo',
      items: [
        { id: 'section-03-01-tim-phat', title: 'Tìm Phật' },
        { id: 'section-03-02-duyen-an-vi-phat', title: 'Duyên An Vị Phật' },
        { id: 'section-03-03-tim-lau-dai', title: 'Tìm Lầu Đài' },
        { id: 'section-03-04-bat-vong-do', title: 'Bất Vọng Độ' },
        { id: 'section-03-05-cau-dao', title: 'Cầu Đạo' },
        { id: 'section-03-06-tim-cau', title: 'Tìm Cầu' },
        { id: 'section-03-07-ga-lang-thang', title: 'Gà Lang Thang' },
      ],
    },
    {
      id: 'section-04-long-biet-on',
      title: '4. Lòng Biết Ơn',
      items: [
        { id: 'section-04-01-kinh-tang-me', title: 'Kính Tặng Mẹ' },
        { id: 'section-04-02-dao-cam-thong', title: 'Đạo Cảm Thông' },
        { id: 'section-04-03-chang-cung-tu', title: 'Chàng Cùng Tử' },
        { id: 'section-04-04-lao-do', title: 'Lão Đò' },
        { id: 'section-04-05-lao-ban-lao-ban', title: 'Lão Bẩn Lão Bần' },
        { id: 'section-04-06-chim-chi', title: 'Chim Chi' },
        { id: 'section-04-07-tu-hu', title: 'Tu Hú' },
        { id: 'section-04-08-hieu-dao', title: 'Hiếu Đạo' },
      ],
    },
    {
      id: 'section-05-gia-dinh',
      title: '5. Gia Đình',
      items: [
        {
          id: 'section-05-01-hieu-biet-moi-yeu-thuong',
          title: 'Hiểu Biết Mới Yêu Thương',
        },
        {
          id: 'section-05-02-thanh-that-chan-that',
          title: 'Thành Thật Chân Thật',
        },
        { id: 'section-05-03-soi-moi', title: 'Soi Mói' },
        { id: 'section-05-04-an-gia', title: 'An Gia' },
        {
          id: 'section-05-05-loi-vang',
          title: 'Lời vàng (mẹ cùng con bỏ ngã nhân)',
        },
      ],
    },
    {
      id: 'section-06-thien',
      title: '6. Thiền',
      items: [
        { id: 'section-06-01-thien', title: 'Thiền' },
        { id: 'section-06-02-cua-thien', title: 'Cửa Thiền' },
        { id: 'section-06-03-thuyen-bat-nha', title: 'Thuyền Bát Nhã' },
      ],
    },
    {
      id: 'section-07-than-thong',
      title: '7. Thần Thông',
      items: [
        { id: 'section-07-01-vo-tu-vo-chung', title: 'Vô Tu Vô Chứng' },
        { id: 'section-07-02-pha-tuong', title: 'Phá Tướng' },
        { id: 'section-07-03-vo-chung', title: 'Vô Chứng' },
        { id: 'section-07-04-thu-da', title: 'Thủ Đà' },
        { id: 'section-07-05-thoi-tu-thoi-chung', title: 'Thôi Tu Thôi Chứng' },
      ],
    },
    {
      id: 'section-08-niem-phat',
      title: '8. Niệm Phật',
      items: [
        { id: 'section-08-01-niem-phat', title: 'Niệm Phật' },
        { id: 'section-08-02-a-di-da-phat', title: 'A Di Đà Phật' },
        { id: 'section-08-03-chu-phat-day', title: 'Chư Phật Dạy' },
        { id: 'section-08-04-phat-cung-gap-nan', title: 'Phật Cũng Gặp Nạn' },
        { id: 'section-08-05-dieu-lien', title: 'Diệu Liên' },
      ],
    },
    {
      id: 'section-09-tu-tap',
      title: '9. Tu Tập',
      items: [
        { id: 'section-09-01-phong-sanh', title: 'Phóng Sanh' },
        { id: 'section-09-02-dao-doi', title: 'Đạo Đời' },
        { id: 'section-09-03-va-ngo', title: 'Vả Ngộ' },
        {
          id: 'section-09-04-hanh-noi-thinh-linh',
          title: 'Hành Nơi Thình Lình',
        },
        { id: 'section-09-05-buong-vay-tra', title: 'Buông Vay Trả' },
      ],
    },
    {
      id: 'section-10-loi-nhac-nho',
      title: '10. Lời Nhắc Nhở',
      items: [
        { id: 'section-10-01-duyen-hanh', title: 'Duyên hành' },
        { id: 'section-10-02-can-than-keo-lam', title: 'Cẩn thận kẻo lầm' },
        { id: 'section-10-03-kiep-con-cua', title: 'Kiếp Con Cua' },
        { id: 'section-10-04-thoat-nan', title: 'Thoát Nạn' },
        { id: 'section-10-05-luon-leo', title: 'Lươn Lẹo' },
        { id: 'section-10-06-hoi-thay-dai-chung', title: 'Hỏi Thay Đại Chúng' },
        { id: 'section-10-07-quen-gio-vang', title: 'Quên Giờ Vàng' },
        { id: 'section-10-08-hanh-sam-hoi', title: 'Hạnh Sám Hối' },
        { id: 'section-10-09-loi-nhac-nho', title: 'Lời Nhắc Nhở' },
        {
          id: 'section-10-10-hang-nguoi-dang-kinh',
          title: 'Hạng Người Đáng Kính',
        },
        { id: 'section-10-11-quyet-chi-nghe-con', title: 'Quyết Chí Nghe Con' },
        {
          id: 'section-10-12-neu-mot-ngay-con-met-moi',
          title: 'Nếu Một Ngày Con Mệt Mỏi',
        },
      ],
    },
    {
      id: 'section-11-phat-chu',
      title: '11. Phật Chú',
      items: [
        { id: 'section-11-01-3t', title: '3T' },
        { id: 'section-11-02-thay-minh', title: 'Thấy Mình' },
        { id: 'section-11-03-ro-minh', title: 'Rõ Mình' },
        {
          id: 'section-11-04-tai-vi-do-boi-tran-cau',
          title: 'Tại - Vì - Do - Bởi Trần Cấu',
        },
        { id: 'section-11-05-cua-minh', title: 'Của Mình' },
        { id: 'section-11-06-vo-nhan', title: 'Vô nhẫn' },
        { id: 'section-11-07-bao-tam', title: 'Bảo tâm' },
        { id: 'section-11-08-cau-tam-an', title: 'Cầu Tâm An' },
        { id: 'section-11-09-tu-tam-bat-do', title: 'Tự Tâm (Bất Độ)' },
      ],
    },
    {
      id: 'section-12-khai-dao',
      title: '12. Khai Đạo',
      items: [
        { id: 'section-12-01-bach-ngon', title: 'Bạch Ngôn' },
        { id: 'section-12-02-dao-hanh', title: 'Dạo Hành' },
        { id: 'section-12-03-thu-phat', title: 'Thủ Phất' },
        { id: 'section-12-04-khai-dao', title: 'Khai Đạo' },
        { id: 'section-12-05-hoan-tra-bui-hong', title: 'Hoàn Trả Bụi Hồng' },
        {
          id: 'section-12-06-me-cung-con-bo-nga-nhan',
          title: 'Mẹ Cùng Con Bỏ Ngã Nhân (Lời Vàng)',
        },
        { id: 'section-12-07-thoat-me-lam', title: 'Thoát Mê Lầm' },
        { id: 'section-12-08-thoat-me', title: 'Thoát Mê' },
        { id: 'section-12-09-tim-an', title: 'Tìm An' },
        { id: 'section-12-10-nguoi-giau', title: 'Người Giàu' },
        { id: 'section-12-11-khai-dao-lowercase', title: 'Khai Đạo' },
        { id: 'section-12-12-mo-dao', title: 'Mở Đạo' },
        {
          id: 'section-12-13-tai-sao-yeu-quai',
          title: 'Tại Sao Yêu Quái Thích Ăn Thịt Đường Tăng',
        },
        { id: 'section-12-14-khai-ngo', title: 'Khai Ngộ' },
        { id: 'section-12-15-gap-nguoi-khai-ngo', title: 'Gặp Người Khai Ngộ' },
      ],
    },
    {
      id: 'section-13-muon-vat-khai-dao',
      title: '13. Mượn Vật Khai Đạo',
      items: [
        { id: 'section-13-01-tom-hoa-rong', title: 'Tôm Hoá Rồng' },
        { id: 'section-13-02-chuyen-doi-dua', title: 'Chuyện Đôi Đũa' },
        { id: 'section-13-03-dong-tien', title: 'Đồng Tiền' },
        { id: 'section-13-04-co-hoa-duong', title: 'Cỏ Hoa Đường' },
        { id: 'section-13-05-dao-cuc', title: 'Đạo Cực' },
        { id: 'section-13-06-uong-nuoc-het-benh', title: 'Uống Nước Hết Bệnh' },
        { id: 'section-13-07-beo-tim-ben', title: 'Bèo Tìm Bến' },
        { id: 'section-13-08-binh-minh', title: 'Bình Minh' },
        { id: 'section-13-09-ngam-trang', title: 'Ngắm Trăng' },
        { id: 'section-13-10-bat-chao-hanh', title: 'Bát Cháo Hành' },
        { id: 'section-13-11-ong-lao-trong-rung', title: 'Ông Lão Trong Rừng' },
      ],
    },
    {
      id: 'section-14-quy-luat',
      title: '14. Quy Luật',
      items: [
        { id: 'section-14-01-dao-mua', title: 'Dạo Mùa' },
        { id: 'section-14-02-oan-hu', title: 'Oán hư' },
        { id: 'section-14-03-so-dao', title: 'Số đạo' },
        { id: 'section-14-04-nam-muoi', title: 'Năm mười' },
        { id: 'section-14-05-dao-lua-troi', title: 'Đạo Lửa Trời' },
      ],
    },
    {
      id: 'section-15-pha-vong',
      title: '15. Phá Vọng',
      items: [
        { id: 'section-15-01-tam-nghi', title: 'Tâm nghi' },
        {
          id: 'section-15-02-dia-nguc-bat-vi-khong',
          title: 'Địa ngục bất vị không',
        },
        { id: 'section-15-03-vong-tuong', title: 'Vọng tưởng' },
      ],
    },
    {
      id: 'section-16-bon-lai',
      title: '16. Bổn Lai',
      items: [
        { id: 'section-16-01-ta-o-dau', title: 'Ta Ở Đâu' },
        { id: 'section-16-02-thu-gi', title: 'Thứ Gì' },
        { id: 'section-16-03-xe-cam', title: 'Xe Câm' },
        { id: 'section-16-04-truong-xuan', title: 'Trường Xuân' },
        { id: 'section-16-05-song-tu-tai', title: 'Sống Tự Tại' },
        { id: 'section-16-06-con-chi', title: 'Con Chi' },
        { id: 'section-16-07-nha-o-dau', title: 'Nhà Ở Đâu' },
      ],
    },
    {
      id: 'section-17-loi-nguyen',
      title: '17. Lời Nguyện',
      items: [
        { id: 'section-17-01-sen-no', title: 'Sen nở' },
        { id: 'section-17-02-da-nhan', title: 'Đã nhận' },
        {
          id: 'section-17-03-nguyen-cho-con-chau',
          title: 'Nguyện cho con cháu',
        },
        { id: 'section-17-04-loi-chi-bay', title: 'Lời Chỉ Bày' },
        { id: 'section-17-05-the-nguyen', title: 'Thệ Nguyện' },
        { id: 'section-17-06-nguyen-cho-con-tre', title: 'Nguyện Cho Con Trẻ' },
        {
          id: 'section-17-07-nguoi-con-thuc-tinh',
          title: 'Người Con Thức Tỉnh',
        },
        {
          id: 'section-17-08-tinh-giac-xuong-toc',
          title: 'Tỉnh Giác Xuống Tóc',
        },
        {
          id: 'section-17-09-lanh-thay-con-chau-ro-dang',
          title: 'Lành Thay Con Cháu Rõ Đàng',
        },
        {
          id: 'section-17-10-con-chau-kinh-ngay-thi-hien',
          title: 'Con Cháu Kính Ngày Thị Hiện',
        },
        { id: 'section-17-11-con-chau-thinh-cau', title: 'Con Cháu Thỉnh Cầu' },
        {
          id: 'section-17-12-nguyen-cho-con-chau-tinh-ngo',
          title: 'Nguyện Cho Con Cháu Tỉnh Ngộ',
        },
        {
          id: 'section-17-13-nguyen-con-chau-vien-man',
          title: 'Nguyện Con Cháu Viên Mãn',
        },
      ],
    },
    {
      id: 'section-18-dip-le',
      title: '18. Dịp Lễ',
      items: [
        { id: 'section-18-01-tang-phu-nu', title: 'Tặng Phụ Nữ' },
        { id: 'section-18-02-xuan', title: 'Xuân' },
        { id: 'section-18-03-tet-nguyen', title: 'Tết Nguyện' },
        { id: 'section-18-04-mung-tet', title: 'Mừng Tết' },
        { id: 'section-18-05-tet-xuan', title: 'Tết Xuân' },
        { id: 'section-18-06-kinh-le-phat-dan', title: 'Kính Lễ Phật Đản' },
        { id: 'section-18-07-thang-bay', title: 'Tháng Bảy' },
        {
          id: 'section-18-08-con-chau-hieu-kinh-dai-le-vu-lan',
          title: 'Con Cháu Hiếu Kính Đại Lễ Vu Lan',
        },
        {
          id: 'section-18-09-dai-le-vu-lan-sam-hoi',
          title: 'Đại Lễ Vu Lan Sám Hối',
        },
        { id: 'section-18-10-20-11-nguyen', title: '20/11 Nguyện' },
        {
          id: 'section-18-11-vu-lan-kinh-hieu-thanh-nhu',
          title: 'Vu Lan Kính Hiếu (Thanh Như)',
        },
        {
          id: 'section-18-12-long-con-kinh-hieu-y-nhu',
          title: 'Lòng Con Kính Hiếu (Ý Như)',
        },
        { id: 'section-18-13-tan-nien-nguyen', title: 'Tân Niên Nguyện' },
        { id: 'section-18-14-tat-nien', title: 'Tất Niên' },
        { id: 'section-18-15-nguyen-tet-xuan', title: 'Nguyện Tết Xuân' },
      ],
    },
    {
      id: 'section-19-cung',
      title: '19. Cúng',
      items: [
        { id: 'section-19-01-cung-chon-tanh', title: 'Cúng Chơn Tánh' },
        { id: 'section-19-02-cung-sieu-thoat', title: 'Cúng Siêu Thoát' },
      ],
    },
    {
      id: 'section-20-cam-niem',
      title: '20. Cảm Niệm',
      items: [
        { id: 'section-20-01-cam-niem-nhu-lai', title: 'Cảm niệm Như Lai' },
        {
          id: 'section-20-02-cam-niem-phat-mau-quan-the-am',
          title: 'Cảm niệm Phật mẫu Quán thế Âm',
        },
        {
          id: 'section-20-03-cam-niem-to-bo-de-dat-ma',
          title: 'Cảm niệm Tổ Bồ Đề Đạt Ma',
        },
        {
          id: 'section-20-04-cam-niem-than-kim-cang',
          title: 'Cảm niệm thần Kim Cang',
        },
        { id: 'section-20-05-cam-on', title: 'Cảm Ơn' },
        {
          id: 'section-20-06-tam-vo-cam-niem-an-cha',
          title: 'Tam Vô Cảm Niệm Ân Cha',
        },
      ],
    },
    {
      id: 'section-21-con-chau-cam-niem-an-su-tam-vo',
      title: '21. Con Cháu Cảm Niệm Ân Sư Tam Vô',
      items: [
        { id: 'section-21-01-chut-noi-niem', title: 'Chút Nỗi niềm' },
        { id: 'section-21-02-on-cha', title: 'Ơn Cha' },
        { id: 'section-21-03-cung-tu-thoi-nay', title: 'Cùng tử thời nay' },
        { id: 'section-21-04-tinh-cha', title: 'Tình Cha' },
        { id: 'section-21-05-chot-buon', title: 'Chợt buồn' },
        {
          id: 'section-21-06-gian-truan-thinh-me',
          title: 'Gian Truân Thỉnh Mẹ',
        },
        { id: 'section-21-07-tro-ve-tinh-chau', title: 'Trở Về (Tịnh Châu)' },
        {
          id: 'section-21-08-mot-chuyen-ve-nha-tinh-chau',
          title: 'Một Chuyến Về Nhà (Tịnh Châu)',
        },
        {
          id: 'section-21-09-tro-ve-truong-dang',
          title: 'Trở Về (Trường Đăng)',
        },
        {
          id: 'section-21-10-duong-ve-nha-minh-chau',
          title: 'Đường Về Nhà (Minh Châu)',
        },
        {
          id: 'section-21-11-ve-nha-cung-cha-hue-tinh',
          title: 'Về Nhà Cùng Cha (Huệ Tịnh)',
        },
      ],
    },
  ]

  const sutraContent: Record<string, SutraContent> = {
    'section-01-01-tam-vo': {
      id: 'section-01-01-tam-vo',
      title: 'Tam Vô',
      content: `Tam Tinh Quy Nhất Bổn
Vô Vật Bất Nhiễm Trần 
Tam Vô Khai Chủng Tánh
Cổ Kim Vô Ngại Hành 

TAM VÔ
 13/ 09/2020


Nguyện Đem Công Đức Này 
Hồi Hướng Đến Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo
`,
    },
    'section-01-02-vo-tu-nga': {
      id: 'section-01-02-vo-tu-nga',
      title: 'Vô Tự Ngã',
      content: `Thiên Địa Luôn Xoay Vần 
Tự Ngã Thị Tối Cao
Tu Di Sơn Tan Rã 
Trực Nhận Liên Hoa Cành

28/ 07/2022`,
    },
    'section-01-03-vo-tuong': {
      id: 'section-01-03-vo-tuong',
      title: 'Vô Tướng',
      content: `Pháp Tướng Hằng Sanh Diệt 
Kiến Tướng Bất Thị Tướng 
Trực Nhận Pháp Tánh Không
Rõ Chân Như Vạn Pháp 

28/07/2023
`,
    },
    'section-01-04-vo-niem': {
      id: 'section-01-04-vo-niem',
      title: 'Vô Niệm',
      content: ` 
Kiến Văn Giác Tri Hành
Trụ Pháp Thân Thanh Tịnh
Rõ Vạn Pháp Hằng Sanh
Niệm Khởi Nơi Vô Niệm 

TAM VÔ
 31/07/2022


Nguyện Đem Công Đức Này 
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo.

`,
    },
    'section-01-05-tam-vo-dai-nguyen': {
      id: 'section-01-05-tam-vo-dai-nguyen',
      title: 'Tam Vô Đại Nguyện',
      content: `Âm dương tứ đại xoay vần
Luôn sanh cuốn hút khó lần lối ra
Chúng sanh quên lối Về Nhà
Trôi lăn lặn ngụp mãi mà không hay

Tỷ năm Tỷ kiếp sa lầy
Luân phiên sáu nẻo biết ngày nào Thôi
Kẻ gieo Ác Nghiệp để rồi
Địa Ngục mở cửa bị lôi ngay vào

Rõ ngay đau khổ thế nào
Thân tâm đau đớn phải gào khóc than
Kẻ gieo ích kỷ nhỏ nhen
Tham cầu tham chấp sống hèn đua tranh

Làm thân Ngạ Quỷ phải đành
Hơn thua dụ dỗ để dành miếng ăn
Kẻ ham giết hại súc sanh
Ăn thịt hành hạ Vật đành ngậm môi

Kiếp sau thành Vật để rồi
Nhận ngay cảnh cũ đã từng gây ra
Ai gieo thiện nghiệp nhưng mà
Chấp vào ái luyến người nhà bà con

Nghiệp duyên dòng tộc vẫn còn
Quay lại vay trả để tròn Tánh Nhân
Ai gieo thiện hạnh mà Sân
Còn mang ngã mạn lớn dần không buôn

Phước về Thần Giới sống luôn
Hưởng cầu vái lạy của người u mê
Ai gieo phước thiện mọi bề
Giúp người giúp vật sẽ về cõi Thiên

An vui hưởng lạc ít phiền
Phước duyên đã hết về liền cõi Nhân
Tam Vô đã rõ mười phân
Dạo chơi trần cấu ai cần chỉ ra

Đại duyên xuống cõi Ta Bà
Phát lời Đại Nguyện chỉ ra lối về
Kẻ Đoạ Địa Ngục u Mê
Biết được Pháp hiệu Tam Vô thoát liền

Ngạ Quỷ mãi dính ưu phiền
Thấy Tam Vô rõ thoát liền kiếp Ma
Súc sanh u tối nhưng mà
Nghe Tam Vô rõ thế là thoát mê

Ai cầu Bản Thể để về
Liễu Tam Vô Ý đường Quê hiển liền
Thần mà muốn hết đảo điên
Liễu Tam Vô Ý tan liền Ngã Nhân

Trời mà muốn thoát Tiên thân
Liễu Tam Vô Ý kiếp Nhân rõ Nhà
Đại Nguyện gửi đến Phật Đà
Mười Phương Chư Phật ở Nhà Chứng Minh

Tam Vô nói rõ việc mình
Luôn hành chỉ lối chúng sinh Về Nhà
Đại Nguyện đã phát nếu mà
Không tròn như thế Vô thà Tử Sanh

Ở trong sáu nẻo mãi hành
Đưa đàn con nhỏ loanh quanh về Nhà
Chỉ cần ai muốn thế là
Tam Vô đến đón về Nhà Như Lai

Đại Nguyện Bất Nhị Không Hai
Nguyện mà bất toại Tam Vô không về
Chúng sanh rối rắm trăm bề
Vô liền gỡ rối dẫn về Quê Xưa

Mãi hành không ngại nắng mưa
Sớm trưa Vô vẫn sẽ đưa người về
Về Nhà người hết u mê
Thường Lạc Ngã Tịnh nơi Quê của mình

Đại duyên Vô gửi chút tình
Nguyện cho đại chúng rõ mình Như Lai
Từ nay hết cảnh bi ai
Vô thời viên mãn về Ngai Phật Đài

TAM VÔ
13/09/2022

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh
Đều Đồng Thành Phật Đạo


`,
    },
    'section-01-06-tam-vo-hang-nhat': {
      id: 'section-01-06-tam-vo-hang-nhat',
      title: 'Tam Vô Hằng Nhật',
      content: `Sáng ra tĩnh tọa một mình
Đến khi xã tọa bình minh đón chào 
Bắt đầu nghe tiếng kêu gào 
Từ nam ra bắc nơi nào cũng vang 


Sáng nào cũng được ăn sang
Tơ Nhện xào Đĩa đã hầm nhiều hôm
Dọn thêm mấy dĩa đầu tôm 
Khổ qua nhồi ớt bọc ôm sấu rừng 


Buổi trưa ăn uống tưng bừng
Bọ cạp rắn rết đã chưng cả nồi
Lẩu cua lươn ếch làm mồi
Rượu bia thuốc lá là ngồi hết trưa


Tối càng ăn uống say xưa 
Ruồi trộn dòi chúa chiên bừa một thau 
Sán dây sán lá món xào 
Rận rệp sam biển nướng chao thơm lừng 


Ăn xong rồi phải đi mần 
Lao công quét rác ân cần siêng năng 
Quản thêm lũ trẻ lăng xăng 
Chuẩn bị cơm nước chúng ăn ấm lòng 


Nhận thêm nghề mở khóa còng 
Tài xế chở đám lòng vòng thoát ra 
Rồi làm thầy pháp bắt ma 
Nhân viên hướng dẫn đường ra khỏi rừng 


Bác sĩ trị bệnh tưng tưng 
Dược sĩ bóc thuốc hết ưng thứ gì 
Giáo viên Phá hết ngu si 
Dội bom Phá núi tu di không còn 


Làm Cha làm mẹ nuôi con 
Làm Ông dạy cháu cho tròn bổn lai 
Rảnh rang đi lượm ve chai 
Tự tay Tái chế thành hài vô song


Quy hoạch bãi rác thong dong 
Làm nơi đổ rác vẫn không phiền lòng
Lái đò đón kẻ lòng vòng
Xong rồi thẩm mỹ từ trong ra ngoài 


Làm nghề cướp bóc bi ai 
Làm tên trộm cắp thói sai người đời
Chuyên gia lừa lọc muôn thời
Làm tên dụ dỗ nghe lời bị An


Từ thiện chẳng tiếng thở than
Ngọc ngà châu báu bạc vàng đều cho 
Chẳng cần tính toán so đo 
Ai duyên nhận được hết lo ưu phiền


Dạo nghề diễn cảnh Phá điên 
Nghề nào cũng nhận miễn người hết mê 
Tùy duyên tiếp dẫn người về
Rõ nơi bản thể chính Quê Phật Đà


Mỗi ngày dạo cảnh la cà 
Lang thang lặn lội tìm ra con mình 
Nắm đầu kéo khỏi vũng sình 
Tắm rửa sạch sẽ rồi rinh về Nhà 


Đứa nào còn cứ la cà
Nện cho một búa tánh ma mất liền 
Đứa nào còn mãi đảo điên 
Như Lai ngự đảnh về Liền Nhà xưa


Tam Vô 
30/07/2024


Nguyện Đem Công Đức Này 
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo. 


`,
    },
    'section-02-01-ton-chi': {
      id: 'section-02-01-ton-chi',
      title: 'Tôn Chỉ',
      content: `Muốn Tự Tại Giải Thoát
Có Vô Tự Chân Kinh
Thường Hành Tâm Thanh Tịnh
Bất Loạn Động Và Si

Diệt Chín Loài Chúng Sanh
Bất Kiến Chúng Diệt Độ
Kiến Tướng Bất Hành Vọng
Liền Ở Tại Tánh Chơn

Tự Tánh Pháp Hằng Sanh
An Nhiên Phật Đà Hành

TAM VÔ
06/07/2022

Theo Tôn Chỉ Điều Ngự Đàm Hoa Thất

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh
Đều Đồng Thành Phật Đạo
`,
    },
    'section-02-02-gioi-qui': {
      id: 'section-02-02-gioi-qui',
      title: 'Giới Qui',
      content: `Ai Cũng Bình Đẳng Như Nhau
Không Được Phân Biệt Người Ngoài Người Thân
Lập Bè Kết Phái Càng Không
Chê Bai Nói Xấu Đau Lòng Người Nghe

Đừng Nên Bịa Chuyện Kiện Thưa
Việc Người Mình Chớ Dây Dưa Xen Vào
Không Mời Cúng Dường Cúng Sao
Giác Ngộ Giải Thoát Người Nào Không Thông

Tuyệt Đối Không Nhận Một Đồng
Không Được Mê Tín Tin Lầm Đường Sai
Tranh Luận Chứng Đắc Đều Không
An Ninh Sạch Sẽ Làm Trong Môi Trường

Không Cầu Không Khẩn Muôn Đường
Lần Đầu Vi Phạm Phê Bình Cho Qua
Lần Hai Cảnh Cáo Rồi Tha
Lần Ba Thì Phải Mời Ra Khỏi Nhà

TAM VÔ
06/07/2022

Theo Nội Quy Điều Ngự Đàm Hoa Thất
Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo
`,
    },
    'section-02-03-cuong-linh': {
      id: 'section-02-03-cuong-linh',
      title: 'Cương Lĩnh',
      content: `Giác Ngộ Phật dạy là chi
Người luôn hiểu biết hết đi lòng vòng
Giải Thoát thì phải làm sao
Hành không Dính Mắc thế nào cũng ra

Mê tín người phải tránh xa
Kẻo liền mất trí về nhà Chân Như
Thấy Nghe Nói Biết rõ ràng
Hiểu lời Phật dạy tỏ đàng Vô Sanh

Tùy duyên giáo hóa chúng sanh
Không vì tư lợi đồng hành Như Lai
Thuận theo Nhân Quả mà hành
Không cần xin phước lạy lục ban ơn 

TAM VÔ
06/07/2022

Theo Cương Lĩnh Sư Điều Ngự Đàm Hoa

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo
`,
    },
    'section-03-01-tim-phat': {
      id: 'section-03-01-tim-phat',
      title: 'Tìm Phật',
      content: `Suy Nghĩ Kiến Luận Mà Thông
Là Đàng Sanh Tử Lông Bông Sáu Loài
Tự Thân Chính Phật Đây Rồi
Ngay Mình Không Nhận Kiếm Hoài Nơi Đâu`,
    },
    'section-03-02-duyen-an-vi-phat': {
      id: 'section-03-02-duyen-an-vi-phat',
      title: 'Duyên an vị Phật',
      content: `Trôi lăn trong cảnh bể dâu

Bơ vơ lạc lối nơi đâu là Nhà

Lang bạc khắp chốn Ta Bà

Mong tìm được lối thoát ra hồng trần

Khổ công tìm kiếm xa gần

Chỉ gặp các lối mê lầm lòng son

Châu nào đâu ở núi non

Cũng không ở chốn sông mòn rừng mê

Thành tâm quyết chí tìm quê

Nhưng càng tìm mãi càng mê càng mờ

Nhất tâm tha thiết mong chờ

Một ngày sẽ có duyên cơ Phật đàng

Đại duyên đại phúc vô vàng

Ngày An Vị Phật rõ đàng Như Lai

Giúp người thoát cảnh bi ai

Bảo Châu sẵn có sống hoài Tịnh Thanh

Từ nay hết bị loanh quanh

Luôn hành tỉnh thức sẽ nhanh về Nhà

Quê Nhà luôn sẵn có Cha

Hoa môi luôn nở biết là tình thân

Hữu duyên Vô chỉ ân cần

Dẫn người thoát tục thoát trần thoát mê

Nay người đã rõ lối về

Hãy luôn tinh tấn đường quê nhất lòng

Không còn ảo cảnh lòng vòng

Không vọng không tưởng giữ lòng thanh cao`,
    },
    'section-03-03-tim-lau-dai': {
      id: 'section-03-03-tim-lau-dai',
      title: 'Tìm lầu đài',
      content: `Bao năm cầu Đạo Lầu Đài

Gặp Vị khai rõ ở ngay mặt mình

Nhưng mình nghi ngại lặng thinh

Thế là tìm tiếp tử sinh vẫn hoài

Đến khi người đã mệt nhoài

Cầu xin chư Phật chỉ đường thoát ra

Buông đi kiến chấp Ngay Ta

Gặp Vị phá Núi lòi ra Lầu Đài

Nhận được bản thể Như Lai

Không hình không vật an hoài là Ta

Thấy nghe nói biết không va

Chủ Nhân Ông đó là Nhà Quê Xưa

Dù cho tứ đại kéo đưa

Lục trần ngũ ấm dây dưa dụ hoài

Ở yên bản thể Như Lai

Sống không dính mắc về Ngai Phật Đà

Tam VÔ

13/02/2024

Nguyện Đem Công Đức Này

Hồi Hướng Khắp Tất Cả

Đệ Tử Và Chúng Sanh

Đều Đồng Thành Phật Đạo`,
    },
    'section-03-04-bat-vong-do': {
      id: 'section-03-04-bat-vong-do',
      title: 'Bất vọng độ',
      content: `Bao năm cầu đạo thoát mê
      
Mong tìm được lối đi về Nhà Xưa
Trãi qua bao cảnh nắng mưa
Vẫn không thấy được đường xưa nơi nào
Hữu duyên Vô vẽ chút màu
Chỉ ra lối cũ để vào Như Lai
Nhưng người cứ chọn lối sai
Hiểu được một chút khoe hoài Ngã Nhân
Lại cho đại chúng bị đần
Thể hiện hiểu biết phá đần chúng sanh
Bản thân còn mãi loanh quanh
Vậy mà Vọng Độ tịnh thanh cho người
Tưởng đâu mình đạt điểm mười
Ngờ đâu bị chúng cười vào mặt cho
Lộ ra cái Ngã rất To
Sân si lý luận tự cho đúng rồi
Đại duyên Vô tặng chữ "Thôi"
Thôi luận Thôi lý càng Thôi Vọng Độ
Thoát ra các cảnh xô bồ
Ai ai cũng Phật người Rồ làm chi
Nay duyên Vô chỉ cách ni
Cầm Tô dạo bước mỗi khi ra đường
Hữu duyên gieo hạt chân thường
Luôn hành tiếp dẫn rõ phương Quê Nhà
Ai cầu sẽ rất thiết tha
Ai nghi người chớ Ta Bà sân si
Đường mình mình hãy cứ đi
Đường người người bước có gì phân bua
Từ nay thoát cảnh hơn thua
Không còn vọng tưởng độ cho muôn loài
Người liền thoát cảnh mệt nhoài
Hành nơi Tự Tánh sẽ hoài an yên`,
    },
    'section-03-05-cau-dao': {
      id: 'section-03-05-cau-dao',
      title: 'Cầu đạo',
      content: `Thanh Như trình kệ cúng dường Sư Cha Tam Vô

Thế gian muôn kiếp lầm than

Vô minh che lấp nên mang nghiệp phàm

Sống đời chẳng biết dừng tham

Trôi lăn sáu nẻo hỏi làm được chi

Rồi khi thấy cảnh a tỳ

Mới mong nhận được Pháp Y thoát lầm

Tìm Bậc đức độ gieo mầm

Cho người thấy được chơn tâm cõi trần

Giúp người hiểu rõ Pháp Thân

Nhận được thể tánh trực chân ngay mình

Không còn chìm đắm u minh

Thông đường tỏ lối lìa sinh tử đàng

Thôi đi vọng tưởng thế gian

Hành trì tinh tấn dần tan mê mờ

Lời Cha thị rõ huyền cơ

Tự buông bản ngã về bờ Chân Như

Người cầu chánh pháp nhất từ

Thường hành cung kính Phật Chư Phổ Hiền

Đừng như nhân thế đảo điên

Muôn thời lặn ngụp chẳng yên tánh mình

Một tuần vật lí nhân sinh

Chờ Cha khai thị rạng minh si lầm

Buông đi mọi sự vướng tâm

Như Lai Nhà đó về thăm hàng thời`,
    },
    'section-03-06-tim-cau': {
      id: 'section-03-06-tim-cau',
      title: 'Tìm cầu',
      content: `TAM VÔ

17/04/2022

Nguyện Đem Công Đức Này

Hồi Hướng Khắp Tất Cả

Đệ Tử Và Chúng Sanh

Đều Đồng Thành Phật Đạo!`,
    },
    'section-03-07-ga-lang-thang': {
      id: 'section-03-07-ga-lang-thang',
      title: 'Gà Lang Thang',
      content: `Hoàng hôn ở Đất Phương Nam 
Có con gà trống lang thang ra vào 

Nhảy qua 6 nhánh mai đào 

Tụ họp cọp sói heo rừng và nai


Cùng nhau kiếm cái sinh nhai 

Cạo lông thay áo thành hài cao nhân 

Cái ăn chẳng phải phân vân 

Chỉ còn cái ngủ phơi thân ngoài trời 


Gà kia chỉ muốn một đời

Chiều nào cũng bước tìm nơi bồ đề 

Kềnh kềnh Cú Quạ trăm bề 

Thợ săn cọp sói heo rừng lăm le 


Tôn Gà làm tướng chở che 

Đi theo một lũ kẹt xe kẹt đường 

Nhận ra thấy cảnh bất thường 

Vua lệnh giải tán Gà về Tây Sơn



Kẻ vui kẻ khóc kẻ hờn 

Mỗi ngày Gà chỉ lờn vờn Cà Tiêu 

Bổng nhiên vào một buổi Chiều 

Gà kia muốn được về miền tây thiên 


Phương Nam Gà bỏ đi liền 

Lũ kia được dịp đảo điên theo cùng 

Lại tạo bao cảnh điên khùng 

Hơn thua cãi vã lùng bùng khắp nơi 


Dù cho Gà mệt đứt hơi 

Kềnh kềnh Quạ Cú chẳng thời dừng tay 

Thợ săn cọp sói hiện thầy 

Heo rừng nai cứ mỗi ngày ăn theo 


Mỗi ngày Gà nhảy thang leo 

Được Tôn Gà cứ càng trèo càng cao 

Lâm nguy chẳng thể kêu gào 

Cả đàn ăn ké càng bào càng vui 


Chiều nào Gà cũng lui cui 

Vướng vào một đống bùi nhùi trách ai 

Chỉ vì một nút gắn sai 

Kéo theo một loạt nút cài lung tung 


Dù cho Gà có phát khùng 

Đám kia cũng chẳng chịu dừng mồi ngon 

Một khi hình tướng Gà còn 

Đám kia cứ vẫn bào mòn ngày đêm 


Hoàng hôn tắt lộ màn đêm 

Gà tìm chỗ ngủ tạm êm cuộc đời 

Một ngày Gà muốn tách rời 

Không còn dính lũ ẩn nơi một mình 


Đời Gà tạm chỗ yên bình 

Uổng cho một kiếp nhân sinh Gà Mờ 

Dù cho Gà được tôn thờ 

Chính Gà tự biết mình Ngơ thế nào 


Giờ đây chẳng biết làm sao 

Ẩn mình cũng chẳng thể nào tỏ thông 

Dù Gà có bước lông bông 

Lại bị lũ ké đẩy ngông lên trời 


Chỉ khi Gà sống ở đời 

Tìm được bản thể liền rời thế gian 

Gặp được Vị chỉ rõ đàng

Hành được bổn tánh tự an muôn thời 


Ai duyên liễu ý bỏ lời 

Sống không dính mắc muôn đời an yên 

Dù cho vạn cảnh đảo điên 

Người luôn tự tại ở miền Phật Xưa 


Tam Vô 

24/02/2025
`,
    },
    'section-04-01-kinh-tang-me': {
      id: 'section-04-01-kinh-tang-me',
      title: 'Kính Tặng Mẹ',
      content: `Nỗi niềm hạnh phúc thế gian
Muôn người vui khoẻ an nhàn thảnh thơi
Sáng ra thấy ánh mặt trời
Tâm hồn tươi sáng giữa đời an yên

Trưa rồi chiều tối bình yên
Muôn thời vui vẻ khắp miền nhân gian
Nhớ người đã vượt gian nan
Cho con được cảnh mãi an như vầy

Mẹ mang chín tháng mười ngày
Hành Mẹ mệt mỏi cả ngày lẫn đêm
Muốn gì Mẹ phải ăn theo
Không thì lại quấy lại đạp Mẹ đau

Vì con Mẹ nén nỗi sầu
Giữ mình vui vẻ giữ Bầu được yên
Vì con Mẹ làm rất siêng
Kiếm cơm kiếm cháo kiếm tiền nuôi con

Mong sao con được vuông tròn
Luôn luôn khoẻ mạnh vung đòn Mẹ đau
Bụng đau Mẹ vẫn tươi cười
Vui vì con nhỏ là người mạnh hơn

Sống trong Cung Tử rất nhờn
Thấy nghe không rõ nhưng mà cảm âm
Lâu lâu có tiếng thì thầm
Của cha của Mẹ lầm bầm bên tai

Nói con đừng có đùa dai
Nằm yên một chỗ đừng đày Mẹ nha
Bao lời yêu dấu cho ta
Đợi chờ tới lúc con ra với đời

Khổ đau Mẹ chẳng một lời
Mẹ luôn hạnh phúc đợi thời sanh con
Đến khi ngày tháng đủ tròn
Mẹ đau quần quại thấu trời thấu xương

Vì con Mẹ rán lên đường
Nhờ người giúp đỡ cho con chào đời
Khi nghe tiếng khóc thành lời
Thấy con đỏ ỏn Mẹ thời an tâm

Ai mà muốn rõ một lần
Thử mang mười ký suốt gần một năm
Để mà thấy rõ tình thâm
Dù luôn mệt mỏi âm thầm Mẹ mang

Con ra Mẹ vẫn chưa nhàn
Phải lo con bú con an thân mình
Con quậy Mẹ vẫn lặng thinh
Lo cho con nhỏ quên mình còn đau

Có khi con biết diễn sâu
Làm hờn làm dỗi để cầu Mẹ yêu
Đến khi con đã biết kêu
Pa Pa Má Má Mẹ liền rất vui

Bao đêm mất ngủ lui cui
Lo cho con lớn con vui mỗi ngày
Con đi con đứng thế này
Đều nhờ ơn Mẹ chịu cày vì con

Đôi khi con dại còn non
Vì lòng ích kỷ mà con cãi Người
Nhưng Mẹ vẫn mãi tươi cười
Vẫn lo vẫn dạy nên Người khôn ngoan

Dù con gặp cảnh trái ngang
Mẹ luôn ở đó giúp An con liền
Con tạo bao cảnh ưu phiền
Mẹ luôn vui vẻ khiến phiền lìa con

Tâm Mẹ lớn tựa núi non
Lớn hơn biển cả hơn Hòn Tu Di
Ai ơi vứt cái Ngã đi
Nghĩ về Mẹ đã Mất gì vì ta

Sống trong cõi tạm Ta Bà
Thờ cha kính Mẹ mới là Đạo Con
Làm sao báo đáp cho tròn
Ơn Sanh nghĩa dưỡng cho con nên người

Muốn Mẹ được mãi vui tươi
Người thời nên thấy tiếng cười Vô Sanh
Bao năm lạc lối loanh quanh
Người nên quyết chí tiến nhanh về Nhà

Quê Nhà chẳng có gần xa
Không nơi không chốn nhưng mà hằng An
Là nơi người mãi an nhàn
Đưa Mẹ về đó là Đàng an yên

Mẹ thời không bị đảo điên
Ung dung tự tại ưu phiền tránh xa
Mẹ luôn hằng sống trong Nhà
Không Si tham ái không va luân hồi

Vô cho người một chữ Thôi
Thôi tham ái luyến để rồi mãi An
Những ai còn Mẹ đừng Than
Đừng gieo oan trái Mẹ mang ưu phiền

Đến khi Mẹ đã quy tiên
Linh đình cúng bái Mẹ hiền còn đâu
Đừng gieo khổ não u sầu
Đưa Mẹ thoát khổ để mau về Nhà

Nhà người không ở đâu xa
Không cầu không kiếm là Nhà quê xưa
Mẹ người không bị nắng mưa
An vui hạnh phúc không ưa não phiền

Nguyện cho Muôn Mẹ an nhiên
Vô lo vô nghĩ vô phiền vô Tâm
Nguyện cho muôn Mẹ an lành
Tỏ chơn thật Tánh Vô Sanh muôn thời

Hữu duyên Vô gửi mấy lời
Nguyện cho nhân thế muôn đời an yên

TAM VÔ
11/08/2022

Nguyện Đem Công Đức Này
Hướng Về Khắp Tất Cả 
Đệ Tử Và Chúng Sanh  
Đều Trọn Thành Phật Đạo 


`,
    },
    'section-04-02-dao-cam-thong': {
      id: 'section-04-02-dao-cam-thong',
      title: 'Đạo Cảm Thông',
      content: `Có một kẻ từ khi sinh ra đời
Khi còn trẻ luôn hồn nhiên vui vẻ
Vô âu lo chẳng bao giờ buồn tẻ
Không muộn phiền mà mãi thấy bình an

Rồi một ngày chạy theo chuyện thế gian
Tự tay mình trói chặt cả toàn thân
Rồi kêu la nhờ người đến cứu giúp
Có Người Trí thương tình mà chỉ rõ

Ông chỉ cần buông bỏ cả hai tay
Là toàn thân không bị tự trói nữa
Kẻ Ngu kia không tiết lời chửi rủa
Bỏ tay rồi mất hết Của tôi sao

Ông không giúp hãy biến ngay đi nào
Đừng ở đó coi chừng không toàn mạng
Người Trí khác ân cần mà chỉ dẫn
Giải thích dùm tại người tự trói thôi

Kẻ Ngu kia liền chửi rủa liên hồi
Ai lại khùng mà tự trói mình đâu
Ông không giúp thì cứ nói một câu
Đừng lừa gạt lấy hết Của tôi nhé

Lại gặp được người Trí chỉ cặn kẽ
Nguyên do đâu mà bị trói thế này
Rồi chỉ gỡ từng li từng tí một
Kẻ Ngu kia phát khùng lên đột ngột

Miệng chửi mắng ông như hai người khác
Lại nói rằng tôi tự trói thân tôi
Này các ông hãy đừng có lôi thôi
Giúp không được đừng làm tôi mất hết

Đường Dạo Hành chẳng thể nhìn điểm kết
Đạo Cảm Thông là không thể nghĩ bàn
Ngước lên trời không một tiếng than van
Mà dòng lệ tuôn rơi hoài không dứt

Tam Vô
03/09/2022

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh
Đều Đồng Thành Phật Đạo.`,
    },
    'section-04-03-chang-cung-tu': {
      id: 'section-04-03-chang-cung-tu',
      title: 'Chàng Cùng Tử',
      content: `Ham chơi vào chốn Ta Bà
Hàng trăm tỷ kiếp quên Nhà Quê Xưa
Trải qua bao kiếp gió mưa
Vui buồn khổ não vẫn ưa chơi hoài

Qua muôn kiếp sống mệt nhoài
Ham mê danh lợi nhận hoài khổ đau
Hốt phân cứ ngỡ làm giàu
Trôi lăn tỷ kiếp vẫn màu xám đen

Tìm Châu nên phải bon chen
Hơn thua giành giật sống hèn với nhau
Nhà mình vốn sẵn Bảo Châu
Mà không chịu nhận kiếm đâu bên ngoài

Cha luôn không tiếc mệt nhoài
Giúp muôn con thoát ra ngoài ngu si
Nhưng đàn con trẻ vẫn lì
Gặp ngay trước mắt kiên trì tránh Cha

QUYẾT TÂM KHÔNG NHẬN NGƯỜI NHÀ 
Nghỉ Cha đến đón chỉ là dụ thôi
Cha đành diệu dụng giả trôi
Hốt phân Cha vẫn giúp lôi con về

Giúp bao con hết u mê
Nghe lời Cha bảo đi về Nhà ta
Con làm mọi thứ trong Nhà
Chẳng cần suy nghĩ thế mà con An

Thấy Nghe Nói Biết rõ ràng
Về đây mới biết là đàng Bảo Châu
Về đây mới biết Cha giàu
Về đây mới biết mình giàu như Cha

Từ nay con hết la cà
Không ham lang bạt Ta Bà loanh quanh
Về Nhà hết tử hết sanh
Là nơi thanh tịnh đất lành Quê Xưa

Ai ơi đừng đợi sớm trưa
Đừng ưa đừng luyến Nhà Xưa hãy về
Về Nhà thoát khỏi vọng mê
Thường Lạc Ngã Tịnh là Quê Niết Bàn

TAM VÔ
24/11/2022

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo
`,
    },
    'section-04-04-lao-do': {
      id: 'section-04-04-lao-do',
      title: 'Lão Đò',
      content: `Bao năm khuya sớm đưa đò
Vượt ngàn sóng gió giúp người qua sông 
Ngày đêm chèo lái không công
Lãi nhiều gươm giáo đâm hông lưng còng 


Miễn người hết cảnh lòng vòng 
Hết trôi hết nỗi thoát sông vào bờ 
Dù ai chẳng nhớ lão đò 
Lão luôn dạo sóng đưa đò thong dong 


Hết duyên để lại con sông 
Cùng Đò Không Đáy ai thông chèo về
Vượt sông Bát Nhã rõ Quê 
Bỏ Đò gặp Lão còng lưng ở Nhà 


TAM VÔ 
12/08/2024


Nguyện Đem Công Đức Này 
Hồi Hướng Khắp Tất Cả 
Tôn Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo
`,
    },
    'section-04-05-lao-ban-lao-ban': {
      id: 'section-04-05-lao-ban-lao-ban',
      title: 'Lão Bẩn Lão Bần',
      content: `Lão Ươm có bẩn có bần
Cũng là hốt cứt dọn phân cho người 
Đến khi sạch sẽ vui tươi
Chớ cười Ươm lão trên người đầy phân


Lành thay người đã hết đần
Thành tâm sám hối lỗi lầm đâm chê
Lành thay người đã hết mê 
Lão đi hốt tiếp cười hề thong dong

Nguyện cho người được thoát còng
Ở yên bản thể đừng trông lão già
Nguyện cho người hết la cà
Giác Ngộ Giải Thoát về Nhà Như Lai 

Tam Vô 
15/08/2024

Nguyện Đem Công Đức Này 
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo. 

- Dạ thưa Sư Cha. Tịnh liên con có nghiên cứu thần số học, con xin Sư Cha khai thị cho con biết là thần số học có nói đúng không ạ? Con xin Sư Cha khai thị cho con biết ý nghĩa các con số ạ.
- Tam Vô: con hãy nghe bài Kệ Vè này
`,
    },
    'section-04-06-chim-chi': {
      id: 'section-04-06-chim-chi',
      title: 'Chim Chi',
      content: `Rừng xanh hiểm trở trùng trùng
Chim kia bay nhảy kiếm tìm thứ chi 
Thấy nơi yên ổn tức thì 
Tìm ngay cỏ tốt để đi xây nhà 


Mỗi ngày chẳng quảng đường xa 
Chẳng lo hiểm trở xây nhà cho xong 
Hoàn thành Chim chẳng ở không 
Lo sinh lo ấp lo trông con mình 


Biết bao nguy hiểm mò rình 
Chim luôn che chở con mình bình an 
Đến khi vỏ trứng vỡ tan
Cả nhà hạnh phúc nhưng càng mệt hơn 


Chim non la hét hay hờn 
Đứa lạnh đứa đói đứa gầy đứa đau 
Chim mẹ chẳng quảng khổ sầu 
Bay tìm khắp chốn bắt đào dế giun 


Dù gặp bao cảnh gian truân 
Chim mẹ chiến đấu đến cùng vì con 
Miễn sao con cái no tròn 
Chim mẹ chịu cảnh no đòn vẫn vui 


Ngày ngày Chim mẹ lui cui 
Lo ăn lo uống lau chùi cho con 
Ngày ngày ăn Cứt chim non 
Chim mẹ chẳng oán miễn con trưởng thành 


Mỗi ngày Chim mẹ loanh quanh 
Cũng vì con nhỏ được nhanh thành hình 
Đến khi lông mọc khắp mình 
Chim mẹ chỉ cách con mình tập bay 


Chỉ con nghe thấy rõ bầy 
Chỉ con biết hót biết cày kiếm ăn
Chỉ con hết chỗ lăng xăng 
Chỉ con biết cách tự lăn cuộc đời


Chim mẹ cũng đến khắc thời 
Cát bụi mẹ trả dứt hơi lên đường 
Bởi đây là lẽ vô thường 
Chim mẹ viên mãn chỉ đường Chim non 


Chim nào Liễu ý sẽ tròn 
Nhớ là Chim mẹ nuôi con bao đời 
Chim thì bay lượn trên trời 
Chim con sẽ vậy chẳng thời đổi thay 


Đại duyên vô nói chỗ này 
Chim Chi Liễu ý biết ngay chính mình 
Vô duyên sẽ mãi tử sinh 
Hữu duyên tỉnh ngộ đời mình mãi an 


Tam Vô
24/10/2024
Nguyện Đem Công Đức Này 
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo.`,
    },
    'section-04-07-tu-hu': {
      id: 'section-04-07-tu-hu',
      title: 'Tu Hú',
      content: `Thương thay tu hú ở đời 
Trứng mình sinh ké ở nơi tổ người 
Đến khi trứng nở tươi cười 
Được cho ăn uống được chăm tận tình 


Dù cho mới được khai sinh 
Vẫn chưa mở mắt tánh tình không thay 
Thấy mẹ đang quấy ngoan ngay 
Mẹ vừa đi khỏi liền bày tánh ma 


Liên hồi quấy phá trong nhà
Anh chị em khác khóc la chẳng màn 
Hãm hại chim khác trong đàn 
Một mình chiếm tổ hung tàn thỏa thân 


Chim Mẹ Nuôi vẫn ân cần 
Nén bao đau đớn nuôi thân con người 
Dù cho còn một đứa lười 
Con ai cũng được cũng cười cũng nuôi 


Ngày ngày Chim mẹ lui cui 
Lo ăn lo uống lau chùi cho con 
Đến khi tu hú to tròn 
Đủ lông đủ cánh vẫn còn đòi ăn 


Chim mẹ chẳng chút lăn tăn 
Vẫn cày vẫn đút thức ăn thật nhiều
Vẫn dạy tu hú bao điều 
Thấy nghe biết hót rõ nhiều điều hay 


Chỉ cho tu hú biết bay 
Chỉ cho tú hú biết cày kiếm ăn
Miễn sao tu hú ăn năn
Không theo ma tánh mà hằng an nhiên 


Trớ trêu tu hú vẫn điên 
Đến mùa sanh sản vẫn tìm tổ thay 
Chẳng biết làm tổ tự tay 
Đem con đi gửi mặc mày diệt sinh 


Đến khi chuốt họa vào mình 
Cũng do cái thói vô tình vô tâm 
Đến khi nhận thấy lỗi lầm
Mẹ con đều mất mãi cầm nỗi đau 


Ai ơi nhận thấy tỉnh mau 
Đừng như tu hú ngày sau khổ sầu 
Sống sao đừng có tư cầu 
Hung tàn ích kỷ khổ đau người mình 


Ai mà hiểu rõ sự tình 
Đừng như tu hú đời mình mãi an 
Sống chung một tổ an nhàn 
Cùng nhau dìu dắt về đàng an yên 


Duyên xem tu hú diễn viên 
Ai mà liễu ý ở yên tánh mình 
Thấy nghe nói biết hằng minh 
Sống không dính mắc đời mình mãi an 


Tam Vô 
08/11/2024
Nguyện Đem Công Đức Này 
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh
Đều Đồng Thành Phật Đạo.`,
    },
    'section-04-08-hieu-dao': {
      id: 'section-04-08-hieu-dao',
      title: 'Hiếu Đạo',
      content: `Tôn Tử Đại Ngộ Kỳ Tâm Đắc
Tinh Thông Vạn Vật Đồng Ma Dắt 
Tổ Phụ Ngự Đảnh Phá Tu Di 
Hiếu Đạo Mãn Viên Đáo Phật Đà 


TAM VÔ 
26/07/2024


Nguyện Đem Công Đức Này 
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo. 
`,
    },
    'section-05-01-hieu-biet-moi-yeu-thuong': {
      id: 'section-05-01-hieu-biet-moi-yeu-thuong',
      title: 'Hiểu Biết Mới Yêu Thương',
      content: `Xưa kia người sống đơn thân
Mong được kết tóc se duyên một người
Đến khi duyên hảo đến rồi
Cùng nhau ước nguyện cả đời yêu nhau

Mỗi ngày chăm sóc vườn rau
Rồi chăm đàn cá hoa màu xanh tươi
Ngày ngày vang rộn tiếng cười
Vợ chồng chia sẻ ngọt bùi với nhau

Trớ trêu vui chẳng bao lâu
Mỗi khi nghịch cảnh càu nhàu than ôi
Ai cũng giữ chặt cái tôi
Hơn thua đổ lỗi móc lôi não phiền

Vợ chồng cứ mãi đảo điên
Buồn bực trách móc triền miên mỗi ngày
Sáng đêm diễn mãi cảnh này
Hỏi người được mấy phút giây an nhàn

Đến khi con trẻ về làng
Vợ chồng hớn hở nhận vàng dưỡng nuôi
Vì con mình phải lui cui
Làm ăn cố gắng để nuôi thành tài

Nuôi con hiểu biết mấy ai
Tài đâu chưa thấy chữ Tai đã về
Thương con mà cứ u mê
Mong cầu con giỏi rồi chê con mình

Bao giờ mới rõ sự tình
Đặt mình nơi ấy sẽ nhìn tỏ thông
Người ơi đừng cứ lông bông
Yêu thương người phải hiểu thông muôn loài

Đời người sẽ hết mệt nhoài
Không cầu không khổ vì người quanh ta
Tự mình thoát khỏi tánh ma
Quay về bản thể rõ nhà mình đâu

Từ nay người hết u sầu
Gia đình người sẽ thấy màu an nhiên
Cả nhà hết đảo hết điên
Sống nơi trần cảnh ưu phiền không mang

Cả nhà người mãi an nhàn
Cùng nhau an lạc trên đàng Như Lai
Từ nay chẳng sợ chữ Tai
Gia đình người mãi an hoài bên nhau

TAM VÔ
21/12/2022

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh
Đều Đồng Thành Phật Đạo 
`,
    },
    'section-05-02-thanh-that-chan-that': {
      id: 'section-05-02-thanh-that-chan-that',
      title: 'Thành Thật Chân Thật',
      content: `Mọi người chung sống với nhau
Hai chữ Thành Thật thế nào phải Thông
Nếu không sẽ mãi lòng vòng
Lươn lẹo lấp liếm hỏi lòng có An

Đến khi sự thật rõ ràng
Biết người lừa dối chữ An khó tìm
Dù cho giải thích hay im
Chữ Tin đã mất hỏi tìm sao ra

Thành tâm Sám Hối người ta
Thành Thật mọi lúc thế là người An
Niềm Tin thấy lại rõ ràng
Niềm vui hạnh phúc an nhàn bên nhau

Nhưng còn Chân Thật thì sao
Sống Chân và Thật thế nào phải Thông
Chân Thật chẳng thể cầu mong
Rõ Chân Thật Tướng là dòng Như Lai

Chân Thật bất nhị không hai
Không vọng không tưởng không xài Lý Do
Không ham tính toán so đo
Không trụ không chấp không lo não phiền

Chân Thật tự hết đảo điên
Muôn thời muôn khắc an nhiên cõi lòng
Ai ơi đừng mãi lòng vòng
Hành luôn Chân Thật cho xong cõi phàm

Duyên sanh thuận nghịch vẫn làm
Sống luôn Chân Thật là Đàng Vô Sanh
Đời người sẽ hết loanh quanh
An nhiên tự tại thường hành Chân Như 

TAM VÔ
21/08/2022

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh
Đều Đồng Thành Phật Đạo
`,
    },
    'section-05-03-soi-moi': {
      id: 'section-05-03-soi-moi',
      title: 'Soi Mói',
      content: `Bao năm chung sống một nhà
Lúc vui lúc khổ vẫn chà đạp nhau
Rảnh rang soi mói nỗi đau
Tìm sâu trong lá gieo sầu cho nhau

Sống sao cho cả nhà giàu
Đừng vì bản ngã làm đau nhà mình
Vạn sự ta cứ lặng thinh
Thâu nhận tất cả chẳng mình chẳng duyên

Trong nhà có một kẻ điên
Tìm ra kẻ đó soi liền lỗi sai
Liên hồi chửi mắng thẳng tay
Thấy sai liền Đập biết Ai an liền

Từ nay người hết ưu phiền
Sống trong nhà lửa an nhiên ngay mình
Đại duyên Vô gửi chút tình
Nguyện cho đại chúng gia đình An Yên

TAM VÔ
18/12/2022

Nguyện Đem Công Đức Này 
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo
`,
    },
    'section-05-04-an-gia': {
      id: 'section-05-04-an-gia',
      title: 'An Gia',
      content: `Hạnh phúc nào có đâu xa
An nhiên tự tại ngay Nhà mình thôi
Có gì mà kiếm xa xôi
Tiền tài danh lợi là nôi não phiền 

Còn tìm còn kiếm đều điên
Buông đi vọng tưởng tự yên ngay mình
Gia đình tự khắc an minh
Cửu huyền thất tổ tự mình thoát ra 

Nguyện cho người rõ Quê Nhà
Dẫn đàn con nhỏ lìa Ma ngay mình
Tham sân si ngã bất sinh
Cả nhà người sẽ hằng minh an nhàn 

TAM VÔ
03/11/2022 

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh
Đều Đồng Thành Phật Đạo
`,
    },
    'section-05-05-loi-vang': {
      id: 'section-05-05-loi-vang',
      title: 'Lời vàng (mẹ cùng con bỏ ngã nhân)',
      content: `Lời chào của Đức Thích Ca
Thiên Thượng Thiên Hạ Duy Ngã Độc Tôn
Ngàn năm vẫn mãi trường tồn
Đời người cái Ngã sưng tôn cao vời

Tự cho Ta quý nhất đời
Người kia chẳng tốt chẳng thời bằng Ta
Vậy nên chỉ thấy có Ta
Mặc cho Cha Mẹ khóc la vì mình

Mặc cho con khổ bên mình
Mặc cho anh chị thương mình hay không
Nghĩ rằng trả nợ đã xong
Tình thân nghĩa mẫu có mong điều gì

Bao giờ mới hết Ngu Si
Tham Sân Tham Ái được gì ở Ta
Gia đình tan nát lìa xa
Mẹ thân côi cút sống xa một mình

Mãi mang cái nợ ân tình
Kiếp nào trả hết Nghĩa Tình Mẫu Thân
Mẹ ơi Mẹ rất ân cần
Lo cho con cháu cái thân chẳng màng

Nhưng lòng Mẹ hãy đừng than
Đừng la đừng mắng như ngàn Dao găm
Đâm vô con nhỏ âm thầm
Sinh bao uất hận gây lầm lỗi con

Thôi thì con dại còn non
Mẹ thương Mẹ dạy bằng đòn Đại Bi
Các con sẽ thấy nhu mì
Tình thương của Mẹ chẳng gì sánh ngang

Gia đình chẳng thể ly tan
Tình thương lan tỏa muôn ngàn dặm xa
Lan ra khắp chốn Ta Bà
Chúng sanh cảm niệm Cả Nhà Đại Bi

Từ nay vứt cái Ngã đi
Gia đình đoàn tụ chẳng gì phá tan
Thuận duyên gửi tặng Lời Vàng
Muôn nhà nhận lấy mở đàng an vui

Muốn được thoát cảnh lui cui
Vứt đi Ngã Thế liền vui Rõ Mình
Ngã mình bất tử bất sinh
Vô hình vô vật hằng minh muôn thời


Người ơi đang sống ở đời
Đừng ôm Ngã Thế mà rời Bổn Lai
Ngã mình chính Phật không hai
Ai duyên nhận rõ an hoài mọi nơi.

TAM VÔ
09/11/2019

Nam Mô Bổn Sư Thích Ca Mô Ni Phật
Nam Mô Thập Phương Chư Phật!

Nguyện Đem Công Đức Này
Hồi Hướng Đến Tất Cả
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo.
`,
    },
    'section-06-01-thien': {
      id: 'section-06-01-thien',
      title: 'Thiền',
      content: `An lạc hạnh phúc đâu xa
Ngay nơi tự tánh vậy mà tìm đâu
Bắt chân quán chiếu tìm cầu
Mong nhận chân lý thoát sầu trầm luân

Ngồi Thiền mộng cảnh như xuân
Khi mà xã toạ gian truân ùa về
Tham sân si ngã muôn bề
Vô thường vẫn dính u mê vẫn hoài

Trôi lăn sinh tử chín loài
Dụng công quán tưởng Đạo ngoài Như Lai
Làm sao thoát cảnh bi ai
Bắt chân ngồi mãi sẽ hoài không ra

Huệ Năng một chữ không va
Không ngồi không tưởng vẫn là Như Lai
Đạt Ma chỉ dạy không sai
Ngồi mà thành Phật chén mài thành Gương

Điều Ngự đàm thật tỏ tường
Ngồi Thiền quán tưởng là đường ngoại lai
Nay Vô thuyết lại Như Lai
Thường hành Tự Tánh Thiền ngay muôn thời

Tùy duyên người sống ở đời
Đói ăn mệt nghỉ hỏi thời toạ chi
Sống luôn Tỉnh Thức không nghi
Vô Tâm Vô Ngã Vô Nghì Vô Sanh

Không cần tìm kiếm loanh quanh
Bảo châu sẵn có tịnh thanh ngay mình
Thiền ngoại ly tướng diệt sinh
Bên trong bất loạn ngay mình Định tâm

Người mà thấu rõ ý thâm
Thường hành tỉnh thức không nhầm lạc trôi
Vô nay để lại chữ THÔI
Thôi công quán tưởng luân hồi dừng ngay

Nguyện cho đại chúng mỗi ngày
An nhiên tự tại được quay về Nhà
Nhà mình ngay tại đây mà
Thôi tìm Thôi kiếm ở Nhà thường an

TAM VÔ
13/11/2022


Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo.
`,
    },
    'section-06-02-cua-thien': {
      id: 'section-06-02-cua-thien',
      title: 'Cửa Thiền',
      content: `Dạ thưa Cha, Ái Như con xin trình Cha chỗ con ngồi thiền. Con đang ngồi biết rõ mình đang ngồi và an nhiên mỉm cười, xong tự nhiên con đến một không gian cảnh đẹp có rất nhiều mây, con thấy Thất Cha ở đó con mừng quá chạy đến cổng gõ cửa xin vào Thất, nhưng không huynh đệ nào mở cửa cho con, con thấy có Cha bên trong nhưng Cha cũng không mở cửa Cho con. Con trèo lên đỉnh cổng thấy rõ chữ Tam Vô Thất Cha, nhưng con vẫn không trèo vào được. Con loay hoay mãi đến khi con quay lại thân căn xả thiền ra con khóc hoài. 
Con xin Cha khai thị cho con, có phải con bị lạc, Cha không cho con về Nhà không ạ?
Tam Vô nói: Ta hỏi con: ai là người thấy con đang gõ cửa thất? Ai là người thấy con kêu gọi? Ai là người thấy con đang trèo qua cổng?
Ái Như: khóc nức nở nói. Dạ thưa Cha, con ngộ ra rồi. Con xin cảm niệm Ân Cha!
Tam Vô: tặng con bài kệ
CỬA THIỀN 
*********
Cửa thiền là cửa Chân Không 
Tâm ai vọng động sẽ không thể vào
Cửa thiền không cổng ra vào 
Tâm không vọng động đã vào Chân Không


Tam Vô
05/06/2024
Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo. 
`,
    },
    'section-06-03-thuyen-bat-nha': {
      id: 'section-06-03-thuyen-bat-nha',
      title: 'Thuyền Bát Nhã',
      content: `Quá Khứ Vị Lai Thị Hiện Hành
Hành Ngay Tự Tánh Lục Căn Tịnh
Càn Khôn Luân Chuyển Chân Tâm Vững
Vô Đắc Vô Trụ Lạc Bình Thanh

Ngoại Ly Vạn Tướng Năng Quy Tánh
Trường Thọ An Nhiên Vô Ngại Hành
Thuyền Nan Hành Giả Quy Bổn Tánh
Hoá Độ Quần Sanh Viên Mãn Thành.

TAM VÔ
13/09/2020

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo
`,
    },
    'section-07-01-vo-tu-vo-chung': {
      id: 'section-07-01-vo-tu-vo-chung',
      title: 'Vô Tu Vô Chứng',
      content: `Vô Tu Vô Chứng Vô Đắc Pháp
Tự Tánh Viên Minh Bất Động Dao
Chân Như Bổn Thể Hằng Thanh Tịnh
Vô Sanh Vô Diệt Lạc Tiêu Dao

TAM VÔ
20/08/2022

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh
Đều Đồng Thành Phật Đạo`,
    },
    'section-07-02-pha-tuong': {
      id: 'section-07-02-pha-tuong',
      title: 'Phá Tướng',
      content: `Sống trong nhân thế buộc ràng
Dính chặt hình tướng mất đàng Vô Sanh
Cuộc đời cứ mãi loanh quanh
Chỉ vì chấp tướng phải đành trôi lăn

Thế là cứ mãi lăng xăng
Muôn đời mò bắt ánh trăng trong đầm
Chấp chặt huyễn cảnh mê lầm
Luân hồi sanh tử vạn năm cõi trần

Nay Vô khai mở ân cần
Buông ngay chấp tướng rõ thân Phật Đà

TAM VÔ
15/08/2022

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh
Đều Đồng Thành Phật Đạo`,
    },
    'section-07-03-vo-chung': {
      id: 'section-07-03-vo-chung',
      title: 'Vô Chứng',
      content: `Bao năm tìm Đạo thoát mê
Mong nhận lối thoát biết về Nhà Xưa
Trôi lăn bao kiếp gió mưa
Thần thông chứng đắc đường Xưa khó tìm

Dù cho Thấy tận cõi thiên 
Cũng còn mờ mịt thấy miền Như Lai
Thông được Thiên Nhãn còn Sai
Nhìn hoài nhìn mãi mê hoài vọng tâm

Dù cho nghe tận thiên âm
Sẽ càng xa cách Vua Âm ngay mình
Thông được Thiên Nhĩ u minh
Nghe hoài âm mãi diệt sinh luân hồi

Dù cho biết được ý người
Chấp chặt chứng tỏ rồi cười chúng sanh
Thông được Tâm vẫn loanh quanh
Dính vào võ đoán lại sanh cõi Thần

Dù cho thoát khỏi nhục thân 
Thấy mình biến hoá phân thân tuyệt vời
Ngờ đâu ngàn kiếp chơi vơi
Dính vào Thần Túc muôn thời trôi lăn

Người ơi đừng có lăng xăng
Tỏ tường quá khứ lại ăn khổ sầu
Vị Lai rõ chắc được đâu
Mà người vẫn dính vẫn cầu Mạng Thông

Người ơi chớ vọng chớ mong
Ưu tư phiền não trong lòng đeo mang
Muốn cho mình mãi an nhàn
Thông muôn lậu hoặc là đàng an yên

Muốn cho hết bị đảo điên
Người luôn tỉnh thức ở yên Tánh mình
Là nơi bất tử bất sinh
Thường hành nơi ấy quang minh tỏ tường

Không còn đắm cảnh mù sương
Không mê chứng đắc là đường Chân Như 
Đại duyên Vô gửi mấy Từ
Vô Tu Vô Chứng thị thời Đạo Nhân

TAM VÔ
21/03/2023

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh
Đều Đồng Thành Phật Đạo 
`,
    },
    'section-07-04-thu-da': {
      id: 'section-07-04-thu-da',
      title: 'Thủ Đà',
      content: `Hầu Khiêu Kỵ Mã Ngàn Trùng Xa 
Tung Hoành Ngang Dọc Khắp Bôn Ba 
Thần Thông Quảng Đại Tu Vi Nhất 
Hòa Dĩ Bất Khả Đoạt Thủ Đà 


Tam Vô
12/11/2024
Nguyện Đem Công Đức Này 
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo
`,
    },
    'section-07-05-thoi-tu-thoi-chung': {
      id: 'section-07-05-thoi-tu-thoi-chung',
      title: 'Thôi Tu Thôi Chứng',
      content: `Bao đời tu chứng thần thông
Thấy mình đắc quả rồi ngông ở đời
Thấy ai cũng phán mọi thời 
Phân chia tốt xấu lại rời Như Lai

Nghĩ rằng mình chẳng đi sai
Ngờ đâu là lối trôi hoài vạn năm
Người lại tìm Ngọc xa xăm
Vượt non lội suối lại lầm lạc trôi

Cho mình chứng đắc quả rồi
Dính bao huyển tướng ôi thôi lạc đường
Mắt càng lâm cảnh mù sương
Đường mình không rõ đòi thương đường người 

Gặp người tâng bốc thì tươi
Gặp người nói thật thì cười bực tâm
Gánh bao ngày tháng âm thầm
Đến khi mệt mỏi phá ầm tan hoang 

Lại còn lôi kéo người ngay
Khiến bao huynh đệ lung lay tín lòng
Bản thân thì cứ lòng vòng
Lại làm Nhất Xiển Đề còng Phật nhân

Nay Vô chỉ rõ ân cần 
Đường nào chứng đắc Thánh Thần dẫn đưa
Muốn về được chốn quê xưa
Ở yên Tự Tánh chẳng ưa cảnh gì 

Là nơi bất khả tư nghì
Ham mê chứng đắc lại đi luân hồi 
Nay Vô để lại chữ "Thôi"
Thôi "Tu" Thôi "Chứng" sẽ Thôi lòng vòng 

Hành nơi Tự Tánh là xong
Thấy Nghe Nói Biết rõ thông Niết Bàn 
Ở nơi Pháp Thể thanh nhàn
An nhiên người bước trên đàng Như Lai 

Con Ta nhớ lấy chỗ này
Mắt con u tối đau hoài mắt Ta
Đi đâu hãy nhớ về Nhà 
Đừng mê rong ruổi la cà thế gian

Về Nhà là chốn hằng an
Không vọng không tưởng là đàng thật chân
Về đây rõ biết Pháp Thân
Thường lạc ngã tịnh mười phân viên tròn

TAM VÔ
11/08/2023

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh
Đều Đồng Thành Phật Đạo.
`,
    },
    'section-08-01-niem-phat': {
      id: 'section-08-01-niem-phat',
      title: 'Niệm Phật',
      content: `Lạc trôi tại cõi Ta Bà
Gian nan khổ cực tìm ra lối về
Trải qua vạn lối u mê
Như Lai chỉ rõ lối về Tây Phương

Thành tâm Niệm Phật đúng đường
Nhất Tâm Bất Loạn Tây Phương rõ Nhà
Nhưng người lại hành Pháp Tà
Niệm Phật không niệm gọi Tên làm gì

Niệm là hằng Nhớ không nghi
Phật là bản thể Như Lai của mình
Quay về Tự Tánh hằng minh
Tây Phương Cực Lạc ngay mình đâu xa

Niệm Phật không cần nói ra
Nhớ về Bản Thể chẳng va bụi trần
Tham Sân Si Ái chẳng gần
Mạn nghi ác kiến muôn lần tự tan

Muôn thời người mãi thanh an
Niệm về Phật Tánh là đàn Như Lai

TAM VÔ
01/09/2022

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo.
`,
    },
    'section-08-02-a-di-da-phat': {
      id: 'section-08-02-a-di-da-phat',
      title: 'A Di Đà Phật',
      content: `Cảm Thương A Di Đà Phật
Thế nhân khổ nạn tất bật gọi tên
Cầu sang Cực Lạc Tây Phương
Người ơi có biết rõ đường nào đi

Tịnh Độ là cõi chi chi
Muốn được đến đó làm gì giờ đây
Không biết sẽ mãi sa lầy
Luân hồi muôn kiếp biết ngày nào ra

Ngày đêm gọi A Di Đà
Vậy người có gặp Phật Đà ấy chưa
Lao đầu gọi sớm gọi trưa
Mãi mà chẳng thấy Đường Xưa để về

Người ơi đừng mãi u mê
Hãy luôn tha thiết tìm về Như Lai
A Di Đà Phật là Ai
Người mà rõ biết về ngay Nhà mình

Là nơi bất tử bất sinh
Tịnh Độ hiện rõ ngay mình đâu xa
Ở đây biết rõ Phật Đà
Vô hình vô Vật chính là mình đây

Hành ngay Tự Tánh mỗi ngày
Vô Lượng Quang giúp thoát lầy thế gian
Hành không dính mắc rõ ràng
Vô Lượng Công Đức ngày càng phát sinh

Ở ngay bản thể của mình
Nhận ra ta chẳng diệt sinh khi nào
Lấy gì tính Tuổi thấp cao
Vô Lượng Thọ ấy thế nào liền thông

Từ nay người hết lông bông
Thường hành Tự Tánh là xong luân hồi
Đến khi nhục thể mãn rồi
Buông đi tất cả về ngôi Di Đà

Thường lạc ngã tịnh tại Ta
Nhận ra bảy báu cũng là mình thôi
Tây Phương hiện rõ đây rồi
Cực lạc rõ lối luân hồi dứt ngay

Nguyện cho đại chúng hằng giây
Nhớ về Tự Tánh liền quay về Nhà
Nguyện cho nhân thế Ta Bà
Biết được bản thể mình là Phật xưa

Người mau liễu Phật dẫn đưa
Tay cao khuyên chúng Dừng ưa luân hồi
Tay kia Phật dạy Buông Thôi
Sống không dính mắc về Ngôi Phật Nhà

Rõ ngay Phật A Di Đà
Ở ngay Tự Tánh vậy mà gọi chi
Biết rồi thoát vọng ngu si
An nhiên người bước lối đi Phật Đà

TAM VÔ
06/07/2023

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh
Đều Đồng Thành Phật Đạo
`,
    },
    'section-08-03-chu-phat-day': {
      id: 'section-08-03-chu-phat-day',
      title: 'Chư Phật Dạy',
      content: `Phật dạy Niệm Phật là chi
Mà sao người cứ gọi A Di Đà
Phật dạy Trì Chú nhưng mà
Người luôn đọc mãi Chữ mà Phật trao

Tụng Kinh Phật dạy muôn thời
Mà sao người cứ đọc lời sách ghi
Gõ mõ Phật dạy là gì
Mà sao người gõ thứ chi cộc cộc

Đánh Chuông Phật dạy rất nhọc
Mà sao người cứ gõ đồng vang thinh
Niệm Phật trì chú tụng kinh
Đánh chuông gõ mõ ngay mình mới An

Ai mà không rõ Bảo Đàng
Như Lai không đến gặp hàng Tà Ma
Chỉ cần biết rõ Quê Nhà
Hành ngay Tự Tánh Phật Đà tại đây

Ngay mình vốn sẵn đủ đầy
Tìm Châu ngoại cảnh sa lầy u mê
Bỏ vọng sẽ tỏ lối về
Pháp Thân Thanh Tịnh là Quê Xưa mình

Quê mình chẳng diệt chẳng sinh
Ung dung tự tại nơi mình Hằng An

TAM VÔ
16/10/2022

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo 
`,
    },
    'section-08-04-phat-cung-gap-nan': {
      id: 'section-08-04-phat-cung-gap-nan',
      title: 'Phật Cũng Gặp Nạn',
      content: `Đản Sanh tại chốn Ta Bà
Thọ thân tứ đại cùng là chúng sanh
Tâm Thanh tại chốn tranh giành
An nhiên tự tại, Phiền đành tránh xa

Nhưng vì giáo hóa cõi ta
Phật thân đây cũng phải va dòng đời
Ma Vương không tiếc tuông lời
Độc ngôn chửi bới Phật thời chẳng thâu

Ma kia tự vả vào đâu
Vả đâu đau đó tự thâu vào mình
Phật Đà vẫn cứ lặng thinh
Như Như Nhất Nhất Thanh Bình Tại Tâm

TAM VÔ
08/12/2019

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh
Đều Đồng Thành Phật Đạo 
`,
    },
    'section-08-05-dieu-lien': {
      id: 'section-08-05-dieu-lien',
      title: 'Diệu Liên',
      content: `
Lâm Thanh U Hiện Diệu Liên Hương 
Hoa Khai Soi Chiếu Khắp Thập Phương 
Tam Kim Quang Tỏa Vô Lượng Xứ
Hữu Duyên Dạo Lộ Cố Gia Thường

TAM VÔ 
04/02/2024

Nguyện Đem Công Đức Này
Hồi Hướng Cho Tất Cả
Đệ Tử Và Chúng Sanh
Đều Đồng Thành Phật Đạo.

`,
    },
    'section-09-01-phong-sanh': {
      id: 'section-09-01-phong-sanh',
      title: 'Phóng Sanh',
      content: `Mọi người hành pháp phóng sanh
Mà sao cứ phóng chúng sanh bên ngoài
Thế thì được phước hưởng sanh
Luân hồi sanh tử loanh quanh cõi phàm

Quay vào bổn tánh mà xem
Tự mình dính chặt chín loài bên trong
Muốn cho ta hết lòng vòng
Người nên phóng hết muôn loài ấy ra

Sống trong cõi tạm Ta Bà
Luôn luôn tỉnh thức nhìn ra chín loài
Phóng khi nó ló ra ngoài
Thường hành từng khắc chẳng còn loài chi

Người mau hành pháp không nghi
Liền về thể tánh tức thì an yên

TAM VÔ
04/07/2022

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh
Đều Đồng Thành Phật Đạọ.
`,
    },
    'section-09-02-dao-doi': {
      id: 'section-09-02-dao-doi',
      title: 'Đạo Đời',
      content: ``,
    },
    'section-09-03-va-ngo': {
      id: 'section-09-03-va-ngo',
      title: 'Vả Ngộ',
      content: `Nhân gian sao thật lạ kỳ 
Ham mê đón nhận những gì tốt thân
Chê bai những thứ xấu bần
Gặp được Ngọc Quý đem cân ra lường 


Sống trong huyễn cảnh vô thường 
Cân đo đong đếm lạc đường Vô Sanh 
Muốn được thoát cảnh loanh quanh 
Vô Tâm đối cảnh tịnh thanh muôn thời 


Ai ơi khi sống ở đời 
Tùy duyên tốt xấu chớ rời bổn lai 
Vạn vật nhất thể không hai 
Nhận được thể Tánh chẳng sai Phật Đà 


Đại duyên cầu pháp rõ Nhà 
Vả cho một cái Ngộ ra Tánh mình 
Thấy nghe nói biết hằng minh 
Hành không dính mắc tử sinh không còn 


Tam Vô 
21/09/2024


Nguyện Đem Công Đức Này 
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo
`,
    },
    'section-09-04-hanh-noi-thinh-linh': {
      id: 'section-09-04-hanh-noi-thinh-linh',
      title: 'Hành Nơi Thình Lình',
      content: `Học đạo là để hành đời
Đừng ham lý thuyết mà rời thế gian 
Đời đâu báo trước gian nan 
Thình lình ăn Vả có an không nào


Cảnh thuận thì thích ôm vào 
Đến khi nghịch cảnh càu nhàu trách than 
Sống sao mãi được thanh nhàn 
Tùy duyên đối cảnh chẳng than chẳng phiền 


Muốn cho hết bị đảo điên 
Cảnh đời thay đổi ở yên Tánh mình 
Dù cho vạn cảnh diệt sinh 
Vạn vật nhất thể rõ mình hằng an 


Tam Vô 
21/09/2024


Nguyện Đem Công Đức Này 
Hồi Hướng Khắp Tất Cả
Đệ  Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo.


`,
    },
    'section-09-05-buong-vay-tra': {
      id: 'section-09-05-buong-vay-tra',
      title: 'Buông Vay Trả',
      content: `Vạn kiếp trôi lăn khắp Ta Bà 
Luân hồi sanh tử vọng thức va
Trả vay ân oán rồi dính chấp
Muôn đời tu mãi chẳng rõ Ta


Dù người ôm mãi áo cà sa 
Vạn năm không rõ đâu là Nhà 
Đường về Phật Giới ngay trước mắt 
Người mù càng bước càng trôi xa


Càng đi càng tạo nghiệp vay trả 
Vạn năm tu tập nghiệp vẫn va
Tưởng rằng nơi đây người tỏa sáng 
Người mù sao rõ lối quê Nhà


Lang thang mỏi mệt vô lượng kiếp 
Cầu Đạo Giải Thoát lòng tha thiết 
Gặp Vị khai mở tức đại duyên 
Giúp người thoát cảnh bị đảo điên


Nhận được người rõ đường an nhiên 
Quyết tâm buông bỏ lối ưu phiền 
Đạo nhân dẫn lối người liền thoát
Người còn mê chấp lại đảo điên 


Duyên nay gửi tặng người chữ BUÔNG 
Buông duyên trần thế Buông vui buồn
Buông vay Buông trả Buông vọng chấp
Buông được liền rõ Đạo đánh chuông 


Buông ngay người hết vọng mê cuồng
Người liền rõ lối Về Nhà luôn
Thấy nghe nói biết không dính mắc 
An nhiên tự tại dạo hành suôn 


Tam Vô
05/03/2024


Nguyện Đem Công Đức Này 
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo
`,
    },
    'section-10-01-duyen-hanh': {
      id: 'section-10-01-duyen-hanh',
      title: 'Duyên hành',
      content: `Đạo đời cứ thuận tuỳ duyên

Việc nào hảo ý hành liền không lo

Cõi trần là cõi mượn cho

Đừng đợi rối rắm mới lo Về Nhà

Vô lo vô nghĩ thế là

Vô danh vô lợi thế mà hằng An

Người mà liễu ý sẽ nhàn

Ung dung tự tại trên đàng Như Lai

Tam Vô

02/10/2022

Nguyện Đem Công Đức Này

Hồi Hướng Khắp Tất Cả 

Đệ Tử Và Chúng Sanh 

Đều Đồng Thành Phật Đạo.
`,
    },
    'section-10-02-can-than-keo-lam': {
      id: 'section-10-02-can-than-keo-lam',
      title: 'Cẩn thận kẻo lầm',
      content: `Vạn vật trên thế gian
Cầu Xin mà có được

Đều là do Mê Lầm

Dễ gặp hàng Quỷ Ma

Sống thuận theo Nhân Quả

Hiểu biết thật rõ ràng

Gieo Nhân Lành việc tốt

Ắt gặt Quả Phước Sanh

Muốn hết bị loanh quanh

Lìa Luân Hồi Sanh Tử

Rõ Pháp Thân Thanh Tịnh

Thường hành ở nơi ấy

Công Đức vô lượng sanh

Giải thoát khỏi Tam Giới

Thấu triệt hết nhân sinh

Thường hành trong thanh tịnh

Dù Tam Thiên tan vỡ

Vẫn ung dung tự tại

TAM VÔ

06/08/2022

Nguyện Đem Công Đức Này

Hồi Hướng Khắp Tất Cả 

Đệ Tử Và Chúng Sanh

Đều Đồng Thành Phật Đạo.
`,
    },
    'section-10-03-kiep-con-cua': {
      id: 'section-10-03-kiep-con-cua',
      title: 'Kiếp con cua',
      content: `Con cua tám cẳng hai càng

Bò ngang bò dọc chẳng màng đến ai

Chẳng cần biết đúng hay sai

Đụng vào càng cứ kẹp hoài không tha

Đến khi bị bắt khóc la

Nhốt vào xô rọ biết là khổ đau

Cố bò cố trốn thoát mau

Nhưng đàn cua khác bám sau chân mình

Giờ đây mới rõ sự tình

Khi gặp hoạn nạn tử sinh rõ Bè

Quyết tâm thoát chẳng e dè

Dù bao khổ nạn khóc nhè ích chi

Thoát Xô cua ráng bước đi

Vô tri vô giác nghĩ là thoát thân

Ngờ đâu cua vẫn cứ đần

Bò vào nồi lẩu bị mần thịt luôn

Thương thay số kiếp con Cua

Vươn càng ngang ngược hơn thua với đời

Đến khi gặp cảnh thất thời

Cua kia cũng phải dứt hơi lên bàn

Muốn cho thấy được rõ đàng

Càng tinh càng tấn phải càng tỏ minh

Nếu không Cua chính như mình

Bò ngang bò dọc rớt uỳnh nước sôi

Muốn không gặp cảnh lăn trôi

Tặng người hữu phúc chữ "Thôi" Phật truyền

Thôi vọng thôi ngã thôi điên

Nhận ra Tự Tánh là yên muôn thời

Ai ơi đang sống ở đời

Thấy nghe nói biết thảnh thơi ngay mình

Vừa luôn tinh tấn vừa minh

Hành ngay Tự Tánh tử sinh không màng


Sống luôn tỉnh thức rõ ràng

Muôn thời người bước trên đàng Như Lai

Từ nay thoát cảnh bi ai

Ung dung tự tại về Ngai Phật Đà

TAM VÔ

17/05/2023

Nguyện Đem Công Đức Này

Hồi Hướng Khắp Tất Cả

Đệ Tử Và Chúng Sanh

Đều Đồng Thành Phật Đạo.
`,
    },
    'section-10-04-thoat-nan': {
      id: 'section-10-04-thoat-nan',
      title: 'Thoát nạn',
      content: `Trôi lăn trong chốn trần lao
Hao tâm khổ trí biết ngày nào ra

Ở trong cõi tạm Ta Bà

Phật đâu chẳng thấy gặp Ma thì đầy

Trãi qua khổ não mỗi ngày
Mong qua kiếp nạn thoát lầy thế gian 
Mỗi lần gặp cảnh gian nan
Đều là bài học rõ đàng mà đi

Người ơi hãy thử tư duy
Càng gặp nạn mãi càng đi lòng vòng
Đời người chưa được tỏ thông
Dứt lìa hơi thở hết mong về Nhà

Muốn cho hết bị la cà
Luôn hành Tự Tánh thế là tỏ thông
Đời người hết bị lông bông
Thấy nghe nói biết hành không gặp phiền

Từ nay người mãi an yên
Bao nhiêu khổ nạn sẽ liền rời xa
Đời người sẽ hết vọng va
Ung dung tự tại về Nhà Như Lai

TAM VÔ
13/05/2023

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh
Đều Đồng Thành Phật Đạo
`,
    },
    'section-10-05-luon-leo': {
      id: 'section-10-05-luon-leo',
      title: 'Lươn lẹo',
      content: `Sanh ra trong cảnh u minh
Không người chỉ rõ biết mình là ai
Tánh ma người mãi theo hoài
Lươn lẹo lấp liếm sống sai không ngừng 
 
Bao đời tìm kiếm cách dừng
Gian nan khổ cực cố nhưng không thành
Mong được thoát kiếp lưu manh
Tham sân si mãi quẩn quanh không rời
 
Thiết tha ngước mặt lên trời 
Cầu xin Chư Phật giúp đời hết luân
Hữu duyên thuận cảnh giáp xuân
Đạo nhân khai thị sống Thuần Như Lai
 
Chỉ người sống đúng không sai
Hành ngay Tự Tánh chẳng hoài loanh quanh 
Giúp người thoát cảnh tử sanh
Đạo nhân chỉ rõ người hành mà thôi 
 
Trớ trêu người cứ thích trôi
Tham mê dính chấp để rồi thành Lươn
Lừa trong nhà tới ngoài đường 
Lừa luôn Vị đã giúp người tỏ thông
 
Đời người cứ mãi lông bông
Lươn lẹo lấp liếm mãi không chịu dừng
Lừa được người thấy rất mừng
Đến khi lộ rõ không ngừng khóc than
 
Ai ơi muốn được thanh nhàn
Không theo Ma Tánh là đàng an yên 
Không lươn không lẹo không phiền
Không lừa không lọc không điên không khùng
 
Ở yên Tự Tánh thoát bùn
Hành luôn chân thật người luôn an hoài
Từ nay thoát cảnh bi ai
Không còn Lươn Lẹo người hoài tịnh thành
 
TAM VÔ 
04/12/2023
 
Nguyện Đem Công Đức Này 
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo
`,
    },
    'section-10-06-hoi-thay-dai-chung': {
      id: 'section-10-06-hoi-thay-dai-chung',
      title: 'Hỏi thay đại chúng',
      content: `Lành thay con trẻ trình bày 
Lợi lạc đại chúng con thay hỏi liền
Dù con chẳng có ưu phiền 
Đặt ra câu hỏi giúp yên muôn người 
 
Ai duyên rõ nghĩa vui cười 
Tâm vì đại chúng điểm mười đại bi
Giúp người hết cảnh ngu si 
Hết mê hết tưởng hết nghi hết ngờ 
 
Ai khôn không tiếc thời giờ
Dự được khai rõ hết mờ thân tâm
Hành ngay sẽ thoát mê lầm
Ung dung ươm nở hạt mầm Liên Hoa 
 
TAM VÔ 
06/12/2023

Tâm An ở Bình Định Hỏi:
*con xin phép Ân Sư Cha khai thị mấy câu sau:
Câu 1: Nơi Chín Suối ( Cửu Tuyền), Suối Vàng ( Hoàng Tuyền) có giống nhau không ạ? Tại sao lại là chín mà không phải là 10 ạ? 
Câu 2: Chánh Báo, Y Báo là gì ạ? 
Câu 3: Quy Y Tam Bảo là gì ạ? 
Câu 4: Từ , Bi, Hỷ, Xả có ý nghĩa gì ạ? 
Câu 5: Tại sao thầy trò Đường Tăng lại phải trải qua đủ 81 kiếp nạn mới thành Phật được ạ? 
Câu 6: 5 Thầy trò Đường Tăng tượng trưng cho những đức tính nào của 1 Người ạ? Tại sao Đường Tăng lại thu nhận Tôn Ngộ Không trước sau đó tới Ngộ Năng , N gộ Tịnh, Bạch Long Mã ạ?  Pháp Danh của Từng Nhân vật có ý nghĩa gì ạ? Tại sao Bạch Long Mã lại không có Pháp Danh ạ ? 
Câu 7: Tại sao Đường Tăng thà tin lầm yêu quái chứ không tin Ngộ Không ạ
Câu 8:  Dấu chấm đỏ trên trán Phật Tổ Như Lai có ý nghĩa gì ạ? 
Câu 9 Câu niệm chú của Đường Tăng là gì mà khiến Vòng Kim Cô làm Ngộ Không đau đầu như vậy ạ? 
Câu 10: Nếu thiếu 1 trong 4 đồ đệ thì Đường Tăng có thỉnh được Kinh không ạ. 
Câu 11 Trong kiếp nạn " Thật, Giả Mỹ Hầu Vương" còn có một con khỉ khác y hệt Ngộ Không. Vậy con khỉ đó có nguồn gốc từ đâu ạ. 
Câu 12: Tại sao hầu hết yêu quái cản đường Thầy Trò Đường Tăng lại là thú nuôi của các vị Tiên trên trời ạ? Các Vị ấy Vô tình để thú nuôi làm hại Bá Tánh vậy. Họ có phải chịu trách nhiệm gì không ạ? 
Câu 13 Tại sao Bạch Long Mã  không được thành Phật ạ? Bát Giới chỉ được phong làm Tịnh Đàn Sứ Giả ( vậy Bát Giới vẫn chưa thành Phật ạ)? 
Dạ !🙏Con xin Ân Sư Cha khai thị !🙏 
Con cảm niệm Ân Sư Cha
`,
    },
    'section-10-07-quen-gio-vang': {
      id: 'section-10-07-quen-gio-vang',
      title: 'Quên giờ vàng',
      content: `Lăng xăng cả tháng với đời
Một buổi Tỉnh Thức để rời thế gian 
Nhưng người vẫn thích lang thang 
Kiếp nào người mới vững đàng Như Lai 


Ai còn thích cảnh bi ai 
Vô nay cũng chẳng thuyết hoài làm chi 
Trần gian người thích cứ đi
Đến khi tắt thở Quy Y thế nào 


Ham mê tìm rác ôm vào
Đến khi mãn thể kêu gào khóc than 
Lúc này mới quý Giờ Vàng
Thì người đã trót sáu đàng chuyển luân


Trôi lăn bao cảnh gian truân
Ngàn đời chẳng rõ Trường Xuân nơi nào 
Một đòn nhắc nhở biết đau
Ai nhận tỉnh thức liền mau về Nhà


Tam Vô 
07/03/2024


Nguyện Đem Công Đức Này
Hồi Hướng khắp Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo.


`,
    },
    'section-10-08-hanh-sam-hoi': {
      id: 'section-10-08-hanh-sam-hoi',
      title: 'Hạnh sám hối',
      content: `Sám hối không chỉ bằng lời
Gây ra lầm lỗi tức thời sám ngay
Phát nguyện hối cãi từ đây
Không còn tái phạm thứ gây sai lầm


Muốn cho không bị mê nhầm
Từng giây từng phút âm thầm soi Ta
Mỗi khi vọng niệm khởi ra
Người liền sám hối đập ma tan tành


Sám hối với cả lòng thành
Buông luôn thân mạn là hành sám chân
Ai mà khởi ý phân vân
Khởi tâm giải đãi lươn đần sám môi


Ai mà không muốn mãi trôi
Tự mình tha thiết soi bao lỗi lầm
Quyết tâm sám hối âm thầm
Không cho ma tánh một lần dẫn đi


Hành hạnh sám hối không nghi
Không còn sai trái ngu si ngay mình
Thấy sai sám hối thật tình
Không còn tội lỗi ngay mình an nhiên


Trên đời hai hạng không điên
Một là luôn đúng ưu phiền chẳng va
Một là biết lỗi ngay ta
Hành Chân Sám Hối phá ma ngay mình


Duyên nay Vô gửi chút tình
Ai nhận liễu ý vô minh không còn
Hành hạnh sám hối viên tròn
Người luôn tỉnh thức không còn dính chi


Sám hối không có tư nghì
Hành ngay Tự Tánh hết đi lòng vòng
Hành không dính mắc thoát còng
Tự do tự tại mãi không luân hồi


Tam Vô
09/03/2024


Nguyện Đem Công Đức Này
Hồi Hướng khắp Tất Cả
Đệ Tử Và Chúng Sanh
Đều Đồng Thành Phật Đạo.
`,
    },
    'section-10-09-loi-nhac-nho': {
      id: 'section-10-09-loi-nhac-nho',
      title: 'Lời nhắc nhở',
      content: `Trôi lăn sanh tử bao đời 
Hỉ nộ ái ố muôn thời khổ đau 
Muốn dừng chẳng biết làm sao 
Loanh quanh chẳng biết cách nào thoát ra 


Kiếp nào cũng ở Ta Bà 
Quyết tâm tìm kiếm Phật Đà nơi đâu 
Toàn gặp những kẻ làm màu 
Chạy theo lại dính khổ sầu thân tâm


Thiết tha thoát cảnh mê lầm 
Đại duyên gặp Vị khai mầm liên hoa
Lệ tuông hạnh phúc vỡ òa 
Duyên được khai mở bảo tòa Như Lai 


Ngỡ rằng sẽ chẳng còn sai 
Ngờ đâu người cứ bám hoài thế gian 
Đạo Nhân căn dặn rõ ràng 
Hành theo lời ấy tỏ đàng vô sanh 


Nhưng người vẫn thích loanh quanh 
Ham mê dính chấp chẳng hành lời khai 
Miệng thì muốn ở Như Lai 
Hành không tinh tấn ở hoài nơi đâu 


Đã qua bao kiếp khổ sầu 
Gặp Vị khai rõ còn cầu thứ chi 
Chỉ cần hành đúng như Y
Làm trang Pháp Bảo hết đi luân hồi


Duyên nay nhắc nhở hãy Thôi 
Thôi tại do bởi là Thôi lòng vòng 
Hành theo lời dặn nhất lòng
Pháp Trần luôn có ai còng được ta


Ai ơi Thôi thích la cà 
Hãy hành tinh tấn về Nhà quê xưa
Nguyện cho đại chúng rõ Thừa
Pháp Trần tiếp dẫn tự đưa người về 


Tam Vô
22/06/2024


NGUYỆN ĐEM CÔNG ĐỨC NÀY 
HỒI HƯỚNG KHẮP TẤT CẢ 
ĐỆ TỬ VÀ CHÚNG SANH 
ĐỀU ĐỒNG THÀNH PHẬT ĐẠO
`,
    },
    'section-10-10-hang-nguoi-dang-kinh': {
      id: 'section-10-10-hang-nguoi-dang-kinh',
      title: 'Hạng người đáng kính',
      content: `Trần gian đáng kính hai người 
Người Chơn Sám Hối người hành không sai
Nay con buông ngã lành thay
Trình ra đại chúng nhận ngay chính mình 


Ai duyên ngộ rõ sự tình
Sống luôn tỉnh thức ngay mình soi ta
Nguyện người lìa hết tánh ma 
An nhiên tiếp dẫn độ tha về Nhà


Tam Vô 
01/08/2024


Nguyện Đem Công Đức Này 
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo. 
`,
    },
    'section-10-11-quyet-chi-nghe-con': {
      id: 'section-10-11-quyet-chi-nghe-con',
      title: 'Quyết chí nghe con',
      content: `"**********
Thật lành thay! con nay rõ cặn kẻ
Quyết một lòng buông bỏ chuyện thế gian
Theo gót Cha về quê sống an nhàn
Dù trần thế có muôn ngàn cuốn hút

Con hãy bước đừng vương dù một chút
Ngàn cách trở vẫn quyết chí nghe con 
Hãy thiết tha hành đến chỗ viên tròn
Thoát hồng trần con trở về Quê cũ

Dù gian khó khi nào cũng biết đủ
Cuộc đời liền ở mãi cảnh thảnh thơi 
Con hãy nhớ đừng mê đắm ham chơi 
Luôn tinh tấn quyết hành nơi tự tánh

Biết rõ ràng tánh ma liền xa lánh
Sống an nhàn nơi bản thể vô lo
Nguyện con trẻ thoát khỏi cảnh mượn cho
Mãn thân này con trở về Phật Cõi 

Tam Vô
22/12/2023
Nguyện Đem Công Đức Này 
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo
`,
    },
    'section-10-12-neu-mot-ngay-con-met-moi': {
      id: 'section-10-12-neu-mot-ngay-con-met-moi',
      title: 'Nếu một ngày con mệt mỏi',
      content: `Nếu một ngày con cảm thấy mệt mỏi
Than trách mình sao sanh cõi u minh
Về bên Cha nơi chẳng có tướng hình
Thấy rõ mình chẳng sinh bao giờ cả

Nếu một ngày con thấy mình mệt lả
Than trách mình sao già yếu nhăn nheo
Về bên Cha nơi chẳng có Tuổi leo 
Thấy rõ mình chẳng bao giờ Già trẻ 

Nếu một ngày thấy mình không mạnh mẽ 
Than trách mình bệnh tật tới triền miên
Về bên Cha chẳng có thân hiện tiền
Thấy rõ mình chẳng bao giờ bệnh nữa 

Nếu một ngày con thấy mình sợ sệt
Than trách đời sao thần chết gọi tên
Về bên Cha chẳng thứ chi tìm đến
Thấy rõ mình chẳng thể nào chết được

Nếu một ngày con thấy mình buồn tủi
Than trách đời sao mãi diễn cảnh chia ly
Về bên Cha chẳng có chỗ đến đi
Thấy rõ đời ai cũng về một chốn

Nếu một ngày con thấy mình khốn đốn
Than trách mình Cầu mãi chẳng được chi
Về bên Cha có mọi thứ diệu kỳ 
Thấy rõ mình thiếu chi mà Cầu lụy

Nếu một ngày con thấy mình tiều tụy
Than trách đời sao đối xử vô tâm
Về bên Cha nơi chẳng có mê lầm
Thấy rõ mình tham sân si chẳng dính

Nếu một ngày con thấy mình loạn tính
Than trách mình theo ngũ uẩn vọng ma
Về bên Cha nơi Tự Tánh là Nhà
Thấy rõ mình chẳng bao giờ vọng tưởng 

Nếu một ngày con thấy mình xót thương
Than trách đời âm dương thường cuốn hút
Về bên Cha chẳng dính dù một chút
Thấy rõ mình tự tại chốn trần lao

TAM VÔ
04/06/2023

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh
Đều Đồng Thành Phật Đạo
`,
    },
    'section-11-01-3t': {
      id: 'section-11-01-3t',
      title: '3T',
      content: `Nó Không Là Gì Cả

Mình Và Người Vọng Động

Rồi Đặt Tên Nó Là ...

Thật Nó Không Là Gì

TAM VÔ

02/08/2022

Nguyện Đem Công Đức Này

Hồi Hướng Khắp Tất Cả

Đệ Tử Và Chúng Sanh

Đều Đồng Thành Phật Đạo`,
    },
    'section-11-02-thay-minh': {
      id: 'section-11-02-thay-minh',
      title: 'Thấy mình',
      content: `Thấy Sắc Không Dính Sắc
Nghe Âm Không Dính Âm
Biết Sắc Âm Đều Giả
Nhận Ngay Pháp Thân Mình

TAM VÔ
21/10/2022

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo
`,
    },
    'section-11-03-ro-minh': {
      id: 'section-11-03-ro-minh',
      title: 'Rõ mình',
      content: `Bản lai chúng sanh là Phật
Vì theo niệm khởi tất bật trần gian
Muôn đời tìm kiếm chữ An
Rõ mình không vật bảo đàng Như Lai

Hành nơi Tự Tánh chẳng sai
Chẳng theo vọng niệm chẳng hoài loanh quanh
Rõ mình bất tử bất sanh
An nhiên tự tại tịnh thanh muôn thời

Đại duyên Vô gửi mấy lời
Người nhận hữu phúc một đời về Quê
Nguyện cho nhân thế hết mê
Rõ Mình chính Phật liền về Nhà Xưa

TAM VÔ
26/06/2023

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh
Đều Đồng Thành Phật Đạo
`,
    },

    'section-11-04-tai-vi-do-boi-tran-cau': {
      id: 'section-11-04-tai-vi-do-boi-tran-cau',
      title: 'Tại – vì – do – bởi trần cấu',
      content: `Sắc ơi sao đẹp tuyệt trần
Làm cho ai đắm thất thần đê mê
Sắc ơi sao lại xấu ghê
Làm cho ai oán trách chê đủ điều

Thanh ơi sao tiếng mỹ miều
Làm cho ai luyến yêu kiều diệu âm
Thanh ơi sao tiếng vang ầm
Làm cho ai khổ ai gầm sân si

Hương ơi sao tỏa diệu kỳ
Làm cho ai ái mùi chi thơm lừng
Hương ơi sao thối quá chừng
Làm cho ai bực muốn ngừng thở luôn

Vị ơi ngon quá khó buông
Làm cho ai đắm dính luôn không rời
Vị ơi dở quá hết lời
Làm cho ai chán cả đời né xa

Xúc chạm thoải mái vậy ta
Làm cho ai luyến cứ va thân vào
Xúc chạm khó chịu thế nào
Làm cho ai giận lập rào cách xa

Pháp ơi thuận ý thế mà
Làm cho ai cũng thích va thọ vào
Pháp mà nghịch ý thì sao
Làm cho ai cũng lao đao xa rời

Lục trần tội chi ở đời
Mà sao tu giả buông lời trách than
Thuận thời không tiếng than van
Nghịch thời đổ lỗi trần gian cuốn mình

Ai ơi xem xét sự tình
Lục trần có lỗi hay mình tự gây
Tánh mình vốn sẵn ngay đây
Vốn hằng thanh tịnh chẳng dây dính trần

Thế mà người vẫn muôn lần
Dính vào trần cấu hỏi mần sao ra
Ai ơi Dừng khởi vọng ma
Dừng Phiền trần cấu thế là tự an

Ở yên Tự Tánh sẽ nhàn
Dừng Phiền trần cấu là đàng Như Lai
Tánh và trần cấu là hai
Dừng Phiền trần cấu ở ngay Tánh mình

Từ nay người mãi hằng minh
Thường hành Tự Tánh nơi mình An nhiên
Đời người hết bị đảo điên
Người luôn an lạc ưu phiền bất sanh

Đời người hết bị loanh quanh
Về nơi thanh tịnh đất lành Quê Xưa
Người ơi đừng ngại sớm trưa
Dừng Phiền trần cấu Nhà Xưa rõ đường

Nay duyên Vô chỉ tỏ tường
Người mau nhận lấy Đạo Thường Như Lai

TAM VÔ
19/11/2022

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo.
`,
    },
    'section-11-05-cua-minh': {
      id: 'section-11-05-cua-minh',
      title: 'Của mình',
      content: `Của mình thì mãi của mình
Nếu mà không phải tham cầu được sao
Bao năm lận đận lao đao
Cố mà níu giữ làm sao an lòng

Buông đi cái Chấp lòng vòng
Nhận ngay Ngọc Quý ở mình đâu xa
Chỉ cần vọng niệm không va
Ở ngay Tự Tánh là Nhà thường An

Đời người sẽ mãi an nhàn
An nhiên tự tại trên đàng Như Lai

Tam Vô
03/09/2022

Nguyện Đem Công Đức Này 
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo.
`,
    },
    'section-11-06-vo-nhan': {
      id: 'section-11-06-vo-nhan',
      title: 'Vô nhẫn',
      content: `Vạn sự hành Nhẫn nén sân si
Đến khi tức nước vỡ cảnh gì
Tùy duyên đối cảnh vô tâm khởi 
Vô nhiễm Vô Nhẫn hoài thảnh thơi 
   
Tam Vô
05/11/2023
    
Nguyện Đem Công Đức Này 
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo
`,
    },
    'section-11-07-bao-tam': {
      id: 'section-11-07-bao-tam',
      title: 'Bảo tâm',
      content: `"**********
Duyên Hợp Tâm Sanh Tan Tâm Diệt
Truy Cầu Tâm Tức Thị Vọng Liên 
Bảo Châu Vô Vật Vô Phương Trú
Tâm Chân Vô Diệt Diệc Vô Sanh

TAM VÔ
01/12/2023

Nguyện Đem Công Đức Này 
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo
`,
    },
    'section-11-08-cau-tam-an': {
      id: 'section-11-08-cau-tam-an',
      title: 'Cầu Tâm An',
      content: `Vạn Niên Truy Cầu Đắc Tâm An 
Lạc Ta Truy Tậu Bất An Thường 
Bản Lai Vô Vật Tâm An Trú 
Nhị Nhãn Bất Dụng Hiển Tâm An 


TAM VÔ 
22/07/2024


Nguyện Đem Công Đức Này 
Hồi Hướng Khắp Tất Cả
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo. 
`,
    },
    'section-11-09-tu-tam-bat-do': {
      id: 'section-11-09-tu-tam-bat-do',
      title: 'Tự Tâm (Bất Độ)',
      content: `Bất Độ trình kệ sở ngộ cúng dường Sư Cha Tam Vô

Quay về tự tâm hằng sáng
Thấy nghe nói biết rõ ràng Huệ Tâm
Phật là bản thể Vô Sanh
Quên mình theo vật phải đành chuyển luân

Phật thường tỏ sáng hằng luôn
Nơi mình sẵn có tìm đâu nhọc nhằn
Lặn lội rừng núi lăng xăng
Thoát được mê lầm Phật ở tại tâm

Thấy nghe nói biết không lầm
Vạn vật thay đổi vô tâm an liền
Từ nay con hết ưu phiền
Cũng vì vọng động lặn chìm Phật ta

Từ nay con đã rõ Nhà
Luôn hằng thanh tịnh Phật Đà Quê Xưa
Cảm Niệm Cha đã dẫn đưa
Khai thị con rõ đường xưa về Nhà

Bất Độ
02/02/2023

Nguyện Đem Công Đức Này
Hồi Hướng Khắp Tất Cả 
Đệ Tử Và Chúng Sanh 
Đều Đồng Thành Phật Đạo
`,
    },
    'section-12-01-bach-ngon': {
      id: 'section-12-01-bach-ngon',
      title: 'Bạch Ngôn',
      content: `Vô lượng ức kiếp chốn kim quang
Nhất niệm lạc trôi sanh tử đàng
Âm dương tứ đại luôn xoay chuyển
Quên mình rồi mãi trú trần gian


Quên luôn quê mình vốn hằng an
Quên đi sứ mệnh kim thân đàng
Quên đi Tự Tánh Nghe Thấy Biết
Quên rồi người cứ mãi lang thang


Cai ngục giam giữ trong tam giới
Sáu căn mở cửa nhằm khiển chơi
Căn trần tiếp xúc sanh nhị thức
Thỏa mãn cảm thọ ái thủ ngay


`,
    },
  }
}
