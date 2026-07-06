package com.homehub.api;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.RestController;

@SpringBootTest
class HomeHubApiApplicationTests {

  @Autowired
  private ApplicationContext applicationContext;

  @Test
  void contextLoads() {
    assertThat(applicationContext).isNotNull();
  }

  @Test
  void noApiEndpointsAreImplemented() {
    Map<String, Object> controllers =
        applicationContext.getBeansWithAnnotation(RestController.class);

    assertThat(controllers).isEmpty();
  }
}
