import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        imageUrl: 'https://i.pinimg.com/474x/3b/3f/a1/3b3fa1a2db40f8f2610b9cd691cfe8e2.jpg',
    },
    {
        id: 3,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        imageUrl: 'https://i.pinimg.com/474x/3b/3f/a1/3b3fa1a2db40f8f2610b9cd691cfe8e2.jpg',
    },
    {
        id: 2,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        imageUrl: 'https://i.pinimg.com/474x/3b/3f/a1/3b3fa1a2db40f8f2610b9cd691cfe8e2.jpg',
    },
]

const teacherSlice = createSlice(
    {
        name: 'teachers',
        initialState: initialState,
        reducers: {
            // add reducers functions as needed
        }
    }
)
export const { setTeacherId } = teacherSlice.actions;

export default teacherSlice.reducer;