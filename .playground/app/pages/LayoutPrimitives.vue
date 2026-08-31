<template>
  <div class="page">
    <h1>Layout Primitives</h1>
    <p>Container, Stack, Grid, and Divider components for layout.</p>

    <section>
      <h2>TContainer</h2>
      <p>Max-width centered container</p>
      <div class="demo-bg">
        <TContainer>
          <TCard>
            <p>Content inside a TContainer is centered and has a maximum width.</p>
          </TCard>
        </TContainer>
      </div>
    </section>

    <section>
      <h2>TStack</h2>
      <p>Vertical or horizontal flex stack with consistent spacing</p>
      
      <h3>Vertical Stack (default)</h3>
      <TStack spacing="md">
        <TCard><p>Item 1</p></TCard>
        <TCard><p>Item 2</p></TCard>
        <TCard><p>Item 3</p></TCard>
      </TStack>

      <TDivider />

      <h3>Horizontal Stack</h3>
      <TStack direction="horizontal" spacing="lg">
        <TCard><p>Item A</p></TCard>
        <TCard><p>Item B</p></TCard>
        <TCard><p>Item C</p></TCard>
      </TStack>

      <TDivider />

      <h3>Different Spacing</h3>
      <div class="demo-row">
        <div>
          <h4>Small</h4>
          <TStack spacing="sm">
            <div class="demo-box">1</div>
            <div class="demo-box">2</div>
            <div class="demo-box">3</div>
          </TStack>
        </div>
        <div>
          <h4>Medium</h4>
          <TStack spacing="md">
            <div class="demo-box">1</div>
            <div class="demo-box">2</div>
            <div class="demo-box">3</div>
          </TStack>
        </div>
        <div>
          <h4>Large</h4>
          <TStack spacing="lg">
            <div class="demo-box">1</div>
            <div class="demo-box">2</div>
            <div class="demo-box">3</div>
          </TStack>
        </div>
      </div>
    </section>

    <section>
      <h2>TGrid</h2>
      <p>Responsive grid layout</p>

      <h3>2 Columns</h3>
      <TGrid cols="2" gap="md">
        <TCard><p>Column 1</p></TCard>
        <TCard><p>Column 2</p></TCard>
        <TCard><p>Column 3</p></TCard>
        <TCard><p>Column 4</p></TCard>
      </TGrid>

      <TDivider />

      <h3>3 Columns</h3>
      <TGrid cols="3" gap="lg">
        <TCard><p>Item 1</p></TCard>
        <TCard><p>Item 2</p></TCard>
        <TCard><p>Item 3</p></TCard>
        <TCard><p>Item 4</p></TCard>
        <TCard><p>Item 5</p></TCard>
        <TCard><p>Item 6</p></TCard>
      </TGrid>

      <TDivider />

      <h3>Auto-fit (responsive)</h3>
      <TGrid cols="auto-fit" min-width="200px" gap="md">
        <TCard><p>Auto 1</p></TCard>
        <TCard><p>Auto 2</p></TCard>
        <TCard><p>Auto 3</p></TCard>
        <TCard><p>Auto 4</p></TCard>
      </TGrid>
    </section>

    <section>
      <h2>TDivider</h2>
      <p>Visual divider line</p>
      <TCard>
        <p>Content above divider</p>
        <TDivider />
        <p>Content below divider</p>
        <TDivider spacing="lg" />
        <p>Content with large spacing</p>
      </TCard>
    </section>
  </div>
</template>

<style scoped>
.page {
  padding: 2rem;
}

section {
  margin: 3rem 0;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
}

h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.demo-bg {
  background: #f3f4f6;
  padding: 2rem;
  border-radius: 8px;
}

.demo-row {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.demo-box {
  background: #047844;
  color: white;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  font-weight: 600;
}
</style>
