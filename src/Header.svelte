<script lang="ts">
  function wow(): void {
    console.log("HI")
  }

</script>

<div class="headerFlex">
  <div>
    <h1>
      Wrushle v.9
    </h1>
  </div>
  <button class="end" on:click={wow}>?</button>
</div>

<style>
  div {
    display: flex;
    height: 2.5em;
  }
  .headerFlex {
    justify-content:space-between;
  }

  .end {
    display:block;
    justify-self:flex-end;
  }

  h1 {
    padding: 0;
    margin: 6px;
    font-size: 1.5em;
  }

  button {
    padding: 0rem 1rem;
  }
  
</style>