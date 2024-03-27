import dayjs from "dayjs";

export const ConvertTime = (postTimestamp) => {
    try {
        const postDate = dayjs(postTimestamp);
  
        // Kiểm tra nếu ngày tháng không hợp lệ.
        if (!postDate.isValid()) {
            throw new Error('Ngày tháng không hợp lệ');
        }
  
        const formattedDateTime = postDate.format('DD-MM-YYYY');
  
        return formattedDateTime;
    } catch (error) {
        console.error('Lỗi:', error.message);
        return null;
    }
}