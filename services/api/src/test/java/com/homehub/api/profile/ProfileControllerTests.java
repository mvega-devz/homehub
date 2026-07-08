package com.homehub.api.profile;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class ProfileControllerTests {

  @Autowired
  private MockMvc mockMvc;

  @Test
  void retrievesProfileInformation() throws Exception {
    mockMvc.perform(get("/api/profile"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.displayName", is("HomeHub User")))
        .andExpect(jsonPath("$.email", is("user@homehub.local")));
  }

  @Test
  void updatesProfileInformation() throws Exception {
    mockMvc.perform(put("/api/profile")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                  "displayName": "Miguel Vega",
                  "email": "miguel@example.com"
                }
                """))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.displayName", is("Miguel Vega")))
        .andExpect(jsonPath("$.email", is("miguel@example.com")));

    mockMvc.perform(get("/api/profile"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.displayName", is("Miguel Vega")))
        .andExpect(jsonPath("$.email", is("miguel@example.com")));
  }

  @Test
  void rejectsInvalidProfileUpdates() throws Exception {
    mockMvc.perform(put("/api/profile")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                  "displayName": "",
                  "email": "not-an-email"
                }
                """))
        .andExpect(status().isBadRequest());
  }
}
