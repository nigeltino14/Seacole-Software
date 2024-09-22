import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = { planList: [], selectedPlan:{}}

const planSlice = createSlice({
    name: 'plan',
    initialState: initialAuthState,
    reducers: {
        setPlans(state, action) {
            state.planList = action.payload
        },
        setSelectedPlans(state, action) {
            state.selectedPlan = action.payload
        }
    }
})
export const planActions = planSlice.actions

export default planSlice.reducer