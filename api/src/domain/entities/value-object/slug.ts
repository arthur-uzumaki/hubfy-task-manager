export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string) {
    return new Slug(value)
  }

  static createFromText(text: string): Slug {
    const slugText = text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/gi, '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase()

    return new Slug(slugText)
  }
}
