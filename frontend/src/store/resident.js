import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
    residentList: [], selectedResident: {},
    handoverResident: {}, selectedBaths: [], selectedWeights: [], selectedFluids: [],
    selectedMoods: [], selectedSleeps: [], selectedMentalStates: [], selectedMorningRoutine: [],
    selectedAfternoonRoutine: [], selectedIncident: []
}

const residentSlice = createSlice({
    name: 'resident',
    initialState: initialAuthState,
    reducers: {
        setResidents(state, action) {
            state.residentList = action.payload
        },
        sethandoverResident(state, action) {
            state.handoverResident = action.payload
        },
        setSelectedResident(state, action) {
            state.selectedResident = action.payload
        },
        setBaths(state, action) {
            state.selectedBaths = action.payload
        },
        setWeights(state, action) {
            state.selectedWeights = action.payload
        },
        setFluids(state, action) {
            state.selectedFluids = action.payload
        },
        setMoods(state, action) {
            state.selectedMoods = action.payload
        },
        setSleeps(state, action) {
            state.selectedSleeps = action.payload
        },
        setMentalStates(state, action) {
            state.selectedMentalStates = action.payload
        },
        setMorningRoutine(state, action) {
            state.selectedMorningRoutine = action.payload
        },
        setAfternoonRoutine(state, action) {
            state.selectedAfternoonRoutine = action.payload
        },
        setIncident(state, action) {
            state.selectedIncident = action.payload
        },

    }
})
export const residentActions = residentSlice.actions

export default residentSlice.reducer