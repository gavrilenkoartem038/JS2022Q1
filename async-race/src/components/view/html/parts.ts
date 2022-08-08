class HTMLParts {
  public header = (): string => {
    return `<header class="header">
    <button class="winners-btn">Winners page</button>
    <div class="controls">
      <div class="create">
        <input type="text" class="create-name">
        <input type="color" class="create-color">
        <button class="create-car">Create car</button>
      </div>
      <div class="update">
        <input type="text" class="update-name">
        <input type="color" class="update-color">
        <button class="update-car" disabled>Update car</button>
      </div>
      <div class="race-all">
        <button class="start-race">Start race</button>
        <button class="reset-race">Reset race</button>
        <button class="generate-cars">Generate</button>
      </div>
    </div>
  </header>`;
  };

  public main = (): string => {
    return `<main class="main">
    <div class="garage-info">
      <h2 class="garage-title">Garage
        <span>(</span> 
        <span class="cars-count">?</span>
        <span>)</span>
      </h2>
      <div class="garage-controls">
        <button class="prev-garage"><</button>
        <div class="garage-counter">
          <span class="garage-cur">1</span>
          <span> / </span>
          <span class="garage-tot">?</span>
        </div>
        <button class="next-garage">></button>
      </div>
    </div>
    <div class="roads"></div>
    <div class="message"></div>
  </main>`;
  };

  public road = (id: number, name: string, color: string): string => {
    return `<div class="road" data-id="${id}">
    <div class="car-data">
      <button class="select" data-id="${id}">Select</button>
      <button class="delete" data-id="${id}">Delete</button>
      <div class="car-name">${name}</div>
    </div>
    <div class="race-container">
      <div class="race-buttons" data-id="${id}">
        <button class="start" data-id="${id}">A</button>
        <button class="stop" data-id="${id}" disabled>B</button>
      </div>
      ${this.car(color)}
    </div>
  </div>`;
  };

  public footer = (): string => {
    return `<footer class="footer">
    <div class="data">
      <span>©</span>
      <span>2022</span>
      <span><a class="link" href="https://github.com/gavrilenkoartem038">gavrilenkoartem038</a></span>
    </div>
    <div class="rss"><a class="link" href="https://rs.school/js/">Rolling Scopes School</a></div>
  </footer>`;
  };

  public car = (color: string): string => {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 42.591" height="30" fill="${color}" class="car" xml:space="preserve"><path d="M19.525,24.44c-5,0-9.069,4.075-9.069,9.089c0,4.986,4.069,9.062,9.069,9.062c5.013,0,9.088-4.076,9.088-9.062  C28.613,28.515,24.538,24.44,19.525,24.44z M19.525,38.412c-2.676,0-4.876-2.201-4.876-4.883c0-2.695,2.201-4.896,4.876-4.896  c2.695,0,4.889,2.201,4.889,4.896C24.414,36.21,22.22,38.412,19.525,38.412z"></path><path d="M80.632,24.44c-5.007,0-9.076,4.075-9.076,9.089c0,4.986,4.069,9.062,9.076,9.062c5.006,0,9.068-4.076,9.068-9.062  C89.7,28.515,85.638,24.44,80.632,24.44z M80.632,38.412c-2.695,0-4.89-2.201-4.89-4.883c0-2.695,2.194-4.896,4.89-4.896  s4.889,2.201,4.889,4.896C85.521,36.21,83.327,38.412,80.632,38.412z"></path><path d="M98.249,26.732c0-8.815-5.495-9.87-5.495-9.87c-8.079-1.133-21.999-1.719-21.999-1.719C69.479,12.93,63.581,0,60.149,0  c-1.158,0-25.781,0-30.143,0c-4.368,0-11.523,12.604-13.092,15.456c0,0-5.482,0.938-8.066,1.537c-1.432,0.325-5.41,0.403-5.41,11.51  H0v5.026h8.366c0-6.172,5.007-11.172,11.159-11.172c6.178,0,11.172,5,11.172,11.172H69.46c0-6.172,4.986-11.172,11.172-11.172  c6.165,0,11.165,5,11.165,11.172H100v-6.797H98.249z M44.746,14.284H27.344c2.35-7.331,6.712-12.565,8.555-12.565  c2.311,0,8.848,0,8.848,0V14.284z M47.988,14.284V1.719c0,0,8.978,0,11.289,0c2.324,0,7.422,10.638,8.854,13.359L47.988,14.284z"></path></svg>`;
  };

  public winners = (): string => {
    return `<div class="winners-page">
    <button class="garage-btn">Garage-page</button>
    <div class="winners-info">
      <h2 class="winners-title">Winners
        <span>(</span> 
        <span class="winners-count">?</span>
        <span>)</span>
      </h2>
      <div class="winners-controls">
        <button class="prev-winners"><</button>
        <div class="winners-counter">
          <span class="winners-cur">1</span>
          <span> / </span>
          <span class="winners-tot">?</span>
        </div>
        <button class="next-winners">></button>
      </div>
    </div>
    <div class="winners">
      <table>
        <tr>
          <th>Number</th>
          <th>Car</th>
          <th>Name</th>
          <th>Wins</th>
          <th>Time(seconds)</th>
        </tr>
      </table>
    </div>
  </div>`;
  };
}
export default HTMLParts;
