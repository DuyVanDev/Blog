import dayjs from "dayjs";

export const ConvertTime = (postTimestamp) => {
    try {
        const postDate = dayjs(postTimestamp);
  
        // Kiểm tra nếu ngày tháng không hợp lệ.
        if (!postDate.isValid()) {
            throw new Error('Ngày tháng không hợp lệ');
        }
  
        const formattedDateTime = postDate.format('YYYY-MM-DD');
  
        return formattedDateTime;
    } catch (error) {
        console.error('Lỗi:', error.message);
        return null;
    }
}