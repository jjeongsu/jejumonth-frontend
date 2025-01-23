import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { fetchChannels } from '../../../apis/channelApi';
import { createPost } from '../../../apis/postCreate';
import { fetchFullName } from '../../../apis/userFullNameApi';

const PostFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    channelId: '',
    file: null,
  });
  const [channels, setChannels] = useState([]);
  const [fullName, setFullName] = useState(''); 
  const [error, setError] = useState(null);


  useEffect(() => { 
    const loadChannels = async () => {
      try {
        const channelsData = await fetchChannels();
        setChannels(channelsData);
      } catch (err) {
        setError(err.message);
      }
    };
    loadChannels();
  }, []);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const name = await fetchFullName();
        setFullName(name || '닉네임 없음'); 
      } catch (err) {
        console.error('사용자 이름 가져오기 에러:', err.message);
        setFullName('사용자 이름 로드 실패'); 
      }
    };
  
    fetchName();
  }, []);
 

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = e => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title || '제목 없음');
    formDataToSend.append('channelId', formData.channelId); 
    if (formData.file) {
      formDataToSend.append('image', formData.file); 
    }

    try {
      await createPost(formDataToSend);
      alert('게시글이 성공적으로 업로드되었습니다!');
      onClose(); 
    } catch (error) {
      alert('게시글 업로드에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6 space-y-6 relative" style={{ height: '100%' }}>
        <h2 className="text-2xl font-bold mb-4">게시글 쓰기</h2>

        
        <div
          style={{
            borderBottom: '1px solid #ddd',
            paddingBottom: '10px',
            marginBottom: '20px',
          }}
        >
          <p className="text-gray-500 text-lg">{fullName  || '닉네임 로딩 중...'}</p>
        </div>

       
        <label className="block text-sm font-medium mb-2"></label>
        <select
          name="channelId"
          className="border border-gray-300 rounded-lg"
          style={{
            width: '235px',
            height: '48px',
            padding: '10px',
            fontSize: '16px',
          }}
          onChange={handleChange}
          value={formData.channelId}
        >
          <option value="">게시판 선택</option>
          {channels
            .filter(channel => channel.name !== '베스트' && channel.name !== '전체')
            .map(channel => (
              <option key={channel._id} value={channel._id}>
                {channel.name}
              </option>
            ))}
        </select>

     
        <label
          className="block text-sm font-medium"
          style={{
            marginTop: '10px',
          }}
        ></label>
        <div
          className="border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-colors"
          style={{
            width: '790px',
            height: '223px',
            padding: '10px',
            marginTop: '20px',
          }}
        >
          <textarea
            type="text"
            name="title"
            className="w-full h-full border-none focus:outline-none resize-none"
            style={{
              fontSize: '16px',
              lineHeight: '1.5',
              backgroundColor: 'transparent',
            }}
            placeholder="내용을 입력해주세요"
            onChange={handleChange}
            value={formData.title}
          ></textarea>
        </div>

        <div
          className="border border-gray-300 rounded-lg flex items-center"
          style={{
            width: '720px',
            height: '72px',
            padding: '10px',
          }}
        >
          <label
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
            style={{
              width: '72px',
              height: '36px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '14px',
              backgroundColor: '#f9f9f9',
            }}
          >
            업로드
            <input type="file" name="file" className="hidden" onChange={handleFileChange} />
          </label>
          {formData.file && (
            <div className="flex items-center gap-2 ml-4">
              <span className="text-gray-700">{formData.file.name}</span>
              <button
                type="button"
                className="text-gray-500 hover:text-red-500"
                onClick={() => setFormData({ ...formData, file: null })}
              >
                ✖
              </button>
            </div>
          )}
        </div>

   
        <div
          className="flex justify-end gap-4"
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '20px',
          }}
        >
          <button
            type="button"
            className="rounded border border-orange-500 text-orange-500 hover:bg-orange-100 transition-colors"
            style={{
              width: '73px',
              height: '44px',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '14px',
            }}
            onClick={onClose}
          >
            취소
          </button>
          <button
            type="submit"
            className="rounded bg-orange-500 text-white hover:bg-orange-600 transition-colors"
            style={{
              width: '73px',
              height: '44px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '14px',
            }}
          >
            확인
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PostFormModal;
