# Nguyễn Thanh Đăng — Portfolio

Portfolio tiếng Việt bằng HTML, CSS và JavaScript thuần. Thiết kế mới ngày 28/10/2026: hero navy, nền sáng xanh nhạt, điểm nhấn cyan bám theo logo cá nhân, typography Be Vietnam Pro và thư viện ảnh dự án tương tác. Giữ logo cá nhân và màu xanh chủ đạo.

## Xem local

Chạy tại thư mục dự án:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Mở http://localhost:4173/. DVP Home là ứng dụng riêng ở http://localhost:5247/; thay đổi portfolio không sửa ứng dụng nhà trọ.

## Nội dung

- Giới thiệu Fullstack C# / .NET, công việc nội dung web và SEO.
- DVP Home: bài toán tìm phòng/quản lý nhà trọ, ảnh sản phẩm, kiến trúc và tiến độ.
- Đăng Nguyên (08/2026–hiện tại): vận hành WordPress; biên tập và đăng bài; xử lý, đăng và tối ưu ảnh; nghiên cứu từ khóa; SEO on-page; FAQ, metadata và HTML; AI và tự động hóa.
- IVS / ABD-CTO (12/2024–07/2026): C# / .NET, MVC/WebForms, DevExpress và đóng góp Sport_Event API.
- Email, số điện thoại, GitHub và PDF CV giữ theo thông tin đã có trong dự án.

Bốn ảnh `assets/images/dvp-*.jpg` chụp trực tiếp từ ứng dụng localhost ngày 27/10/2026: trang chủ, danh sách phòng, chi tiết phòng và đăng nhập. Dữ liệu phòng là dữ liệu demo. Bấm ảnh để xem lớn; Escape hoặc nút Đóng để đóng, focus trở về nút mở.

Ảnh và luồng công khai đã được kiểm tra trực tiếp. Công nghệ đã được đối chiếu mã hiện tại: ASP.NET Core 8, EF Core, PostgreSQL, React/TypeScript/Vite, CSS, cookie authentication, phân quyền và Hangfire. Chưa kiểm thử lại các màn hình quản trị sau đăng nhập trong lần cập nhật CV. Không dùng ảnh dashboard giả, không thêm số liệu tăng trưởng SEO hoặc thứ hạng.

## Cập nhật

- Chỉnh nội dung, thông tin liên hệ và đường dẫn trong `index.html`.
- Màu sắc, bố cục và breakpoint trong `css/style.css`.
- Menu mobile, lightbox, sao chép email và đánh dấu mục điều hướng trong `js/script.js`.
- PDF CV tại thư mục gốc đã được cập nhật ngày 27/10/2026: bản tiếng Anh một trang, bổ sung công việc Website Content and SEO tại Đăng Nguyên và dự án DVP Home. Bản xuất nằm trong output/pdf; mã dựng lại là tools/build_cv.py (ReportLab và pypdf, font Be Vietnam Pro đi kèm trong assets/fonts). Các nút tải CV vẫn dùng cùng đường dẫn.
- Liên kết “Mở bản local” chỉ hiện khi portfolio được mở trên localhost hoặc từ file. Khi có demo công khai, thay URL trong HTML và bỏ điều kiện `.local-demo` trong JavaScript.

Không cần npm hay bước build. Để deploy tĩnh, đưa `index.html`, `css/`, `js/`, `assets/`, PDF CV và `.nojekyll` lên hosting. Đường dẫn tài nguyên tương đối hỗ trợ GitHub Pages dưới thư mục repository. `portfolio.zip` chứa bản website hiện tại.


## Typography và ảnh dự án

- Be Vietnam Pro được lưu trực tiếp trong assets/fonts, hỗ trợ dấu tiếng Việt, không tải Google Fonts khi người dùng mở trang. Nguồn: https://github.com/google/fonts/tree/main/ofl/bevietnampro. Giấy phép SIL Open Font License nằm trong assets/fonts/OFL.txt.
- Phân cấp font 400/500/600/700, khoảng dòng dành đủ chỗ cho dấu tiếng Việt. CV cũng đã được chuyển sang Be Vietnam Pro, giữ một trang.
- DVP Home dùng một gallery lớn với 4 nút chọn: tìm phòng, trang chủ, chi tiết, đăng nhập. Khung ảnh giữ cùng kích thước khi đổi màn hình.
- Ảnh bình thường giữ tỷ lệ gốc với object-fit: contain. Ảnh trang chủ và chi tiết dùng crop theo tọa độ CSS để tập trung vào phần cần xem. Không kéo giãn ảnh, không thay đổi các file chụp gốc; lightbox luôn mở bản gốc.
- Các breakpoint bao gồm desktop, tablet và mobile; menu thu gọn tại 760px. Thanh tiến độ đọc dùng requestAnimationFrame; prefers-reduced-motion được tôn trọng.
- preview/responsive.html là trang QA cục bộ, kiểm tra 1280px, 375px và 320px cùng trạng thái tải font và tràn ngang.


## Chuyển động và nhận diện

Màu nhận diện lấy từ logo cá nhân cyan #0098cc; navy #082d43, màu hành động #007da6 và cyan sáng #8cddf5. Ảnh DVP Home giữ màu gốc của sản phẩm.

Hover chỉ áp dụng chuyển động cho thiết bị có chuột: nút nâng 2px, mũi tên dịch nhẹ, ảnh zoom 1.018 lần trong 420ms. Crop và tỷ lệ ảnh được giữ nguyên. Gallery fade 240ms khi ảnh mới tải xong; không chạy lại khi chọn đúng ảnh hiện tại. Các khối nội dung xuất hiện một lần với IntersectionObserver và tự trở về trạng thái không transform sau hiệu ứng. Lightbox và menu có hiệu ứng mở ngắn.

Không thêm thư viện, vòng lặp chuột hay animation chạy liên tục. Thanh tiến độ dùng transform scaleX trong requestAnimationFrame thay cho cập nhật width. prefers-reduced-motion tắt hiệu ứng CSS, bỏ fade của ảnh và dừng animation đang chạy khi tùy chọn thay đổi. Nội dung luôn hiển thị kể cả khi JavaScript không chạy.
