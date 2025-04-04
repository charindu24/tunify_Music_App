/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from '@/lib/axios';
import{ create } from 'zustand';

interface MusicStore {
    songs: any[];
    albums: any[];
    isLoading: boolean;
    error: string | null;

    fetchAlbums: () => Promise<void>;
}





export const useMusicstore = create((set) => ({
    album: [],
    songs: [],
    isLoading: false,
    error: null,

    fetchAlbums: async () => {

        set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/albums");
			set({ albums: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},
}));