import Navbar from "../components/Navbar"

function Instruction() {
    return (
        <><Navbar />
        <br />
        <h4>Tiếng Việt</h4>
        <h3>Các bước đặt lịch khám</h3>
        <ul>
            <li><b>Bước 1:</b> Sau khi đăng nhập, chọn mục "Đặt lịch khám" từ menu chính.</li>
            <li><b>Bước 2:</b> Chọn thú cưng cần khám từ danh sách thú cưng của bạn. Nếu thú cưng chưa có trong danh sách, bạn có thể thêm mới bằng cách nhấn vào "Thêm thú cưng".</li>
            <li><b>Bước 3:</b> Chọn ngày và giờ muốn đặt lịch khám.</li>
            <li><b>Bước 4:</b> Chọn dịch vụ bạn muốn sử dụng. </li>
            <li><b>Bước 5:</b> Nhập các thông tin liên quan đến lý do khám hoặc các triệu chứng hiện tại của thú cưng.</li>
            <li><b>Bước 6:</b> Kiểm tra lại thông tin và nhấn "Xác nhận" để hoàn tất quá trình đặt lịch.</li>
        </ul>
        
        <hr />
        <h4>English</h4>
        <h3>How to book an appointment</h3>
        <ul>
            <li><b>Step 1:</b> After successfully logging in our system, click on the "Appointment" tab on the left of the menu bar</li>
            <li><b>Step 2:</b> Pick one animal you would like to make an appointment. If you haven't added any pet in your account, make sure you do it by clicking on the "Pets" tab on the menu and proceed to add the required information. </li>
            <li><b>Step 3:</b> Choose the right date and time you would like to make an appointment</li>
            <li><b>Step 4:</b> Choose the service provided  </li>
            <li><b>Step 5:</b> Take a note about your pet condition (optional)</li>
            <li><b>Step 6:</b> Check your information one more time then click the "Confirm" to confirming your request</li>
        </ul>
        </>
    )
}

export default Instruction