import create from 'zustand';

const useStore = create(set => ({
  imageData: null,
  setImageData: (data) => set({ imageData: data })
}));

export default useStore;