# Nguyễn Thanh Đăng — Portfolio

Portfolio tiếng Việt bằng HTML, CSS và JavaScript thuần. Giao diện xanh rêu, kem và nền sáng được lấy cảm hứng từ DVP Home; giữ logo cá nhân gốc.

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

Ảnh và luồng công khai đã được kiểm tra trực tiếp. Kiến trúc công nghệ và phạm vi quản lý kế thừa hồ sơ dự án trước đó; chưa xác nhận các màn hình quản trị sau đăng nhập. Không dùng ảnh dashboard giả, không thêm số liệu tăng trưởng SEO hoặc thứ hạng.

## Cập nhật

- Chỉnh nội dung, thông tin liên hệ và đường dẫn trong `index.html`.
- Màu sắc, bố cục và breakpoint trong `css/style.css`.
- Menu mobile, lightbox, sao chép email và đánh dấu mục điều hướng trong `js/script.js`.
- Giữ PDF CV ở thư mục gốc. Nội dung bên trong PDF chưa được sửa trong lần cập nhật portfolio này.
- Liên kết “Mở bản local” chỉ hiện khi portfolio được mở trên localhost hoặc từ file. Khi có demo công khai, thay URL trong HTML và bỏ điều kiện `.local-demo` trong JavaScript.

Không cần npm hay bước build. Để deploy tĩnh, đưa `index.html`, `css/`, `js/`, `assets/`, PDF CV và `.nojekyll` lên hosting. Đường dẫn tài nguyên tương đối hỗ trợ GitHub Pages dưới thư mục repository. `portfolio.zip` chứa bản website hiện tại.
