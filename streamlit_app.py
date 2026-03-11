import streamlit as st

st.title("Smart Music Composer Using AI")

st.write("Welcome to AI Music Composer")

song_name = st.text_input("Enter song name")

if st.button("Generate Music"):
    st.success("Music generated for: " + song_name)
