# Nguyễn Thanh Đăng — Personal Portfolio

Portfolio tiếng Anh bằng HTML, CSS và Vanilla JavaScript. Không có framework, npm, build hay backend. Chạy bằng cách mở `index.html` và có thể deploy trực tiếp trên GitHub Pages.

## Design concept

- **Visual direction:** nhận diện từ logo hình học xanh cyan do chủ website cung cấp. Nền trắng, khối vuông, đường kẻ rõ và khoảng trắng; NhaTro giữ khu vực riêng và case study mở rộng được.
- **Color palette:** nền `#ffffff`, chữ navy `#163343`, chữ phụ `#546b78`, xanh nhận diện `#0098cc`. Dùng xanh đậm `#00769f` cho nút/chữ để dễ đọc; nền khối xanh rất nhạt `#f1f7fa`.
- **Typography:** Arial/Helvetica cho nội dung và tiêu đề, Courier New cho nhãn kỹ thuật. Chữ sans-serif phù hợp hình học logo; font hệ thống, không tải font bên ngoài.
- **Layout:** header kết hợp logo và tên; hero đặt tên, vai trò, giới thiệu, CTA bên trái, logo lớn và luồng Database → API → Frontend bên phải. Mobile đưa logo thành dải nhận diện gọn. Tiếp theo là NhaTro, kiến trúc, kinh nghiệm, stack, cách làm việc và liên hệ. Footer và favicon dùng cùng logo.
- **Phù hợp hồ sơ:** đặt .NET và kinh nghiệm IVS ngay đầu; phân biệt React của dự án cá nhân với frontend commercial tại IVS. Không thêm số liệu, sản phẩm, khách hàng hay thành tích chưa được cung cấp.

## Cấu trúc

```text
index.html
css/
  style.css
js/
  script.js
assets/
  images/
    logo.png              ← logo gốc, dùng cho header/hero/footer/favicon
    .gitkeep
    nhatro-dashboard.png  ← thêm ảnh thật sau
    nhatro-login.png      ← thêm ảnh thật sau
    nhatro-tenant.png     ← thêm ảnh thật sau
    profile.jpg           ← tùy chọn; thiết kế hiện tại không cần ảnh chân dung
.nojekyll
README.md
```

Ba ảnh NhaTro không được tạo sẵn. Website hiển thị khung thay thế khi thiếu hoặc lỗi ảnh. Không có screenshot giả. `.gitkeep` giữ thư mục ảnh trong Git. `.nojekyll` là file trống để phục vụ mã tĩnh trực tiếp.

`assets/images/logo.png` là bản sao nguyên vẹn của `logo.png` do bạn cung cấp ở thư mục gốc. Không đổi hình, màu hay tỷ lệ của ảnh. Khi thay logo sau này, cập nhật bản trong `assets/images`. File logo ở gốc không cần upload khi deploy.

## 1. Chạy local

Mở `index.html` trong trình duyệt. Hoặc, nếu có Python, mở terminal tại thư mục website:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Truy cập địa chỉ local được in trong terminal, cổng `4173`. Nhấn `Ctrl+C` để dừng. Python chỉ phục vụ xem trước; website deploy không cần Python. Clipboard hoạt động tốt nhất trên localhost hoặc HTTPS. Khi không truy cập được clipboard, nút Copy chọn địa chỉ email để bạn copy thủ công.

## 2. Tạo GitHub repository

Trên GitHub, tạo repository **Public** để dùng GitHub Pages với tài khoản Free. Có thể đặt tên `portfolio`; hoặc dùng tên repository tương ứng với user site của tài khoản. Không cần chọn template hay cài package.

## 3. Upload code

Dùng **Add file → Upload files**, tải `index.html`, `css`, `js`, `assets` và `README.md` lên **gốc repository**, giữ đúng cấu trúc thư mục. Commit thay đổi lên `main`.

Thêm file trống `.nojekyll` ở gốc. Nếu công cụ upload không hiện file ẩn, dùng **Add file → Create new file**, đặt tên `.nojekyll` rồi commit. Có thể để `.gitkeep` trong thư mục ảnh cho đến khi có ảnh thật.

Không đưa cả thư mục cha thành một cấp thư mục con: `index.html` phải nằm trực tiếp ở gốc nguồn xuất bản.

## 4. Enable GitHub Pages

Mở repository → **Settings → Pages**. Trong **Build and deployment**, chọn **Source: Deploy from a branch**, branch **main**, folder **/(root)**, rồi **Save**.

Hướng dẫn nguồn: [GitHub Docs — Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## 5. Deploy và cập nhật

Xem tiến trình trong tab **Actions**. Khi deployment thành công, mở **Settings → Pages → Visit site**. Dùng URL do GitHub cung cấp; website không giả định username hay URL cá nhân.

Mỗi lần commit thay đổi vào branch nguồn, GitHub Pages sẽ cập nhật site. Có thể cần chờ deployment hoàn tất rồi tải lại trình duyệt. CSS, JavaScript, ảnh và CV đều dùng đường dẫn tương đối để hoạt động cả khi site nằm dưới thư mục repository.

Nguồn: [GitHub Docs — Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

## 6. Cập nhật screenshot NhaTro

Đặt ảnh thật, đúng chữ thường, tại:

```text
assets/images/nhatro-dashboard.png
assets/images/nhatro-login.png
assets/images/nhatro-tenant.png
```

Upload/commit các ảnh, chờ deploy và reload. JavaScript tự ẩn placeholder, hiện ảnh, đổi nhãn thành `PRODUCT SCREENSHOT` và bật lightbox. Không cần sửa HTML. Giữ tên file chính xác vì GitHub Pages phân biệt chữ hoa/thường.

Khung ảnh có tỷ lệ cố định; ảnh dùng `object-fit: contain` để không cắt nội dung. Nên dùng ảnh ngang và nén trước khi upload. Chỉ dùng ảnh được phép chia sẻ và che thông tin riêng tư trước khi đưa lên site. Click ảnh để phóng to; Escape, nút Close hoặc click nền để đóng. Focus trở về nút mở ảnh.

## 7. Thay email, GitHub, LinkedIn và CV

Chỉnh khu vực `CONFIG` ở đầu `js/script.js`:

```js
EMAIL: "YOUR_EMAIL",
GITHUB_URL: "YOUR_GITHUB_URL",
LINKEDIN_URL: "YOUR_LINKEDIN_URL",
CV_URL: "YOUR_CV_URL",
NHATRO_DEMO_URL: "YOUR_NHATRO_DEMO_URL",
NHATRO_CODE_URL: "YOUR_NHATRO_CODE_URL",
```

- `EMAIL`: thay bằng email thật. Mailto và Copy được bật tự động.
- `GITHUB_URL`, `LINKEDIN_URL`: dùng URL thật đầy đủ bắt đầu bằng `https://`.
- `CV_URL`: thêm PDF vào `assets`, rồi đặt đường dẫn tương đối, chẳng hạn `assets/Nguyen-Thanh-Dang-CV.pdf`. Hoặc dùng URL HTTP(S) thật. Trình duyệt có thể mở thay vì tải xuống nếu PDF ở domain khác.
- Khi giữ placeholder, nút vẫn hiển thị nhưng không có `href`, không mở trang giả và không nằm trong thứ tự Tab.
- CONFIG dùng để cập nhật thông tin sau khi JavaScript chạy. Nếu cần nội dung mới cũng xuất hiện khi tắt JavaScript, cập nhật giá trị tương ứng trong HTML.

## 8. Thêm Live Demo khi NhaTro deploy xong

Điền URL thật vào `NHATRO_DEMO_URL`; điền URL repository được phép công khai vào `NHATRO_CODE_URL`. Hai nút hoạt động độc lập. Không dùng URL portfolio thay cho URL mã nguồn NhaTro.

Chỉnh trạng thái và tiến độ trong cùng CONFIG:

```js
PROJECT_STATUS: "ACTIVE DEVELOPMENT",
PROJECT_CURRENT: "Currently rebuilding and deploying the system.",
PROJECT_NEXT: "[ADD PROJECT DETAILS: the next development milestone]"
```

Cập nhật bằng nội dung đúng với tiến độ thực tế. Có live demo không đồng nghĩa hệ thống đã ở production. Khi sửa nội dung cốt lõi, cập nhật cả câu giới thiệu NhaTro và các thẻ SEO trong `index.html` nếu cần.

## 9. Nội dung cần bổ sung

Tìm `[ADD PROJECT DETAILS` trong `index.html` và `js/script.js` để bổ sung bối cảnh vấn đề, phần việc tự triển khai, thách thức và mốc tiếp theo. Education giữ `[ADD EDUCATION DETAILS]` vì chưa có thông tin. Bạn có thể bổ sung hoặc xóa khối education nếu chưa muốn công khai.

Sơ đồ NhaTro chỉ ghi **EF Core**, không tự thêm Dapper vào dự án. Dapper được trình bày trong kinh nghiệm IVS / Sport_Event API. Các tính năng NhaTro được mô tả là phạm vi đã có hoặc đang phát triển; chưa gán mức hoàn thiện cho từng tính năng. Sport_Event API nằm trong kinh nghiệm IVS để không bị hiểu nhầm là dự án cá nhân.

Thay màu trong `:root` của `css/style.css`. Sau khi có URL site và ảnh chia sẻ thật, thêm `og:url` và `og:image` dạng URL tuyệt đối tại comment trong `<head>`. Không có URL canonical hoặc ảnh chia sẻ giả.

## 10. Kiểm tra trước khi công khai

- Điền hoặc xử lý các placeholder còn lại theo dữ liệu thật.
- Kiểm tra email, PDF, GitHub, LinkedIn và link dự án sau khi thay CONFIG.
- Xem ở 1440, 1280, 1024, 768, 390 và 375px; mở/đóng menu mobile.
- Kiểm tra bàn phím: Tab, Enter, Escape, skip link và focus indicator.
- Kiểm tra ảnh thiếu, ảnh thật và lightbox; thử tùy chọn Reduce motion của hệ điều hành.
- Website không cần backend, npm hay build; không có thư viện hoặc dịch vụ bên ngoài chạy lúc tải trang.

Chưa deploy lên GitHub trong lần tạo này: tài khoản, repository và URL cá nhân chưa được cung cấp.
