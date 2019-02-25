<template>
  <v-app dark>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Countdown Recorder</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs8>
                    <v-radio-group v-model="timeLength" row label="Time Length">
                      <v-radio label="45s" value="45"></v-radio>
                      <v-radio label="60s" value="60"></v-radio>
                    </v-radio-group>
                    <v-btn @click="startRecord" fab :disabled="isRecording"><v-icon>fiber_manual_record</v-icon></v-btn>
                    <v-btn @click="control" fab :disabled="controlDisabled"><v-icon>{{ controlIcon }}</v-icon></v-btn>
                    <v-btn fab :disabled="!hasRecorded"><v-icon>save</v-icon></v-btn>
                  </v-flex>
                  <v-flex xs4>
                      <span class="display-4">{{ String(remainLength).padStart(2, '0') }}</span>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <!-- <v-card-actions></v-card-actions> -->
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
// Seperate the TypeScript file from SFC in order to trigger tslint in VSCode.
import App from "./app-script";
export default App;
</script>

<style>
</style>
