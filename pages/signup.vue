<template>
  <div>
    <section class="section no-top-pad">
      <h1 class="title is-1">Signup</h1>
      <hr />

      <div class="columns is-centered is-mobile">
        <div class="column is-half-desktop is-full-mobile is-full-tablet">
          <form @submit.prevent="onSignUp">
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input
                  class="input is-rounded"
                  type="text"
                  name="displayName"
                  v-model="displayName"
                  v-validate="'required|min:4'"
                  :class="{ 'is-danger': errors.has('displayName') }"
                />
                <p
                  v-show="errors.has('displayName')"
                  class="help is-danger"
                >{{ errors.first('displayName') }}</p>
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  class="input is-rounded"
                  type="email"
                  name="email"
                  v-model="email"
                  v-validate="'required|email'"
                  :class="{ 'is-danger': errors.has('email') }"
                />
                <p v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</p>
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  class="input is-rounded"
                  type="password"
                  name="password"
                  v-model="password"
                  v-validate="'required|min:6'"
                  :class="{ 'is-danger': errors.has('password') }"
                />
                <p
                  v-show="errors.has('password')"
                  class="help is-danger"
                >{{ errors.first('password') }}</p>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <button
                  class="button is-primary"
                  :class="{ 'is-loading': busy }"
                  :disabled="busy"
                >Signup</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>