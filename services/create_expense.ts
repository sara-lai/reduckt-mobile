import axios from 'axios'
const baseNgrok = "https://8539aeeace2b.ngrok-free.app" //"https://123223392986.ngrok-free.app"

const baseProd = 'https://www.reduckt.com'
const api = axios.create({ baseURL: baseNgrok })

export const createNewExpense = async (imageUri, audioUri) => {

  // goal: make this format same as web expenses_controller form
  const formData = new FormData();

  if (imageUri) {
    const fileName = imageUri.split('/').pop() || 'image.jpg';
    const ext = fileName.split('.').pop()?.toLowerCase() || 'jpg';
    const mimeType = `image/${ext === 'png' ? 'png' : 'jpeg'}`;
    formData.append('expense[images][]', { uri: imageUri, name: fileName, type: mimeType })
  }

  if (audioUri) {
    // todo - RubyLLM::BadRequestError (Invalid value: 'mp4'. Supported values are: 'wav' and 'mp3'.):
    const audioFileName = audioUri.split('/').pop()
    const audioMimeType = 'audio/m4a'
    formData.append('expense[voice_notes][]', { uri: audioUri, name: audioFileName, type: audioMimeType })
  }

  try {
    const response = await api.post('/test_mobile?mobile_demo=yes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      }
    })
    return response.data;
  } catch (error) {
    console.error('Expense creation failed:', error);
    throw error;
  }
};
