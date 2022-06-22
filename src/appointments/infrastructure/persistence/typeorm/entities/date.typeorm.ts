import { Column } from 'typeorm';

export class DateTypeOrm {
  @Column('date', { name: 'date', nullable: false })
  public date: string;

  private constructor(
    date: string
  ) {
    this.date = date;
  }

  public static from(date: string) {
    return new DateTypeOrm(date);
  }
  public static of(
    day: number,
    month: number,
    year: number
  ) {
    let  date = `${year}/${month}/${day}`;
    return new DateTypeOrm(date);
  }
}