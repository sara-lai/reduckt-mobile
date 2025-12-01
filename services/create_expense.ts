import axios from 'axios'
const api = axios.create({ baseURL: 'https://www.reduckt.com' })

// testing images only - todo - expand to audio / files
export const createNewExpense = async (imageUri) => {

  console.log('this is submitting, testing')

  const fileName = imageUri.split('/').pop() || 'image.jpg';
  const ext = fileName.split('.').pop()?.toLowerCase() || 'jpg';
  const mimeType = `image/${ext === 'png' ? 'png' : 'jpeg'}`;

  // goal: make this format same as web expenses_controller form
  const formData = new FormData();
  formData.append('expense[images][]', { uri: imageUri, name: fileName, type: mimeType });

  try {
    const response = await api.post('/test_mobile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Expense creation failed:', error);
    throw error;
  }
};
