import React, { createElement } from "react";
import {
  ReactQuestionFactory,
  SurveyQuestionElementBase,
} from "survey-react-ui";
import { Question, Serializer } from "survey-core";
import { Input, Select, Radio, Rate, DatePicker, Checkbox } from "antd";
import type { RadioChangeEvent } from "antd";
import dayjs, { Dayjs } from "dayjs";

// Ant Design Text Input
export class QuestionAntdTextModel extends Question {
  getType() {
    return "antd-text";
  }
}

class SurveyQuestionAntdText extends SurveyQuestionElementBase {
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.question.value = e.target.value;
  };

  render() {
    const question = this.props.question as QuestionAntdTextModel;
    if (!question) return null;
    return (
      <div>
        <Input
          value={question.value || ""}
          onChange={this.handleChange}
          disabled={question.isReadOnly}
          placeholder={question.placeHolder}
          size="large"
        />
      </div>
    );
  }
}

// Ant Design Select
export class QuestionAntdSelectModel extends Question {
  getType() {
    return "antd-select";
  }
}

class SurveyQuestionAntdSelect extends SurveyQuestionElementBase {
  handleChange = (value: string) => {
    this.props.question.value = value;
  };

  render() {
    const question = this.props.question as QuestionAntdSelectModel;
    if (!question) return null;
    const options = question.choices.map((choice: any) => ({
      value: choice.value,
      label: choice.text,
    }));

    return (
      <div>
        <Select
          value={question.value}
          onChange={this.handleChange}
          options={options}
          disabled={question.isReadOnly}
          placeholder={question.placeHolder || "Please select"}
          style={{ width: "100%" }}
          size="large"
        />
      </div>
    );
  }
}

// Ant Design Radio Group
export class QuestionAntdRadioModel extends Question {
  getType() {
    return "antd-radio";
  }
}

class SurveyQuestionAntdRadio extends SurveyQuestionElementBase {
  handleChange = (e: RadioChangeEvent) => {
    this.props.question.value = e.target.value;
  };

  render() {
    const question = this.props.question as QuestionAntdRadioModel;
    if (!question) return null;
    const options = question.choices.map((choice: any) => ({
      value: choice.value,
      label: choice.text,
    }));

    return (
      <div>
        <Radio.Group
          value={question.value}
          onChange={this.handleChange}
          disabled={question.isReadOnly}
          options={options}
          size="large"
        />
      </div>
    );
  }
}

// Ant Design Rating
export class QuestionAntdRateModel extends Question {
  getType() {
    return "antd-rate";
  }

  get rateMax(): number {
    return this.getPropertyValue("rateMax", 5);
  }
  set rateMax(val: number) {
    this.setPropertyValue("rateMax", val);
  }
}

class SurveyQuestionAntdRate extends SurveyQuestionElementBase {
  handleChange = (value: number) => {
    this.props.question.value = value;
  };

  render() {
    const question = this.props.question as QuestionAntdRateModel;
    if (!question) return null;
    return (
      <div>
        <Rate
          value={question.value}
          onChange={this.handleChange}
          disabled={question.isReadOnly}
          count={question.rateMax}
        />
      </div>
    );
  }
}

// Ant Design Date Picker
export class QuestionAntdDateModel extends Question {
  getType() {
    return "antd-date";
  }
}

class SurveyQuestionAntdDate extends SurveyQuestionElementBase {
  handleChange = (_date: Dayjs | null, dateString: string | string[]) => {
    this.props.question.value = dateString;
  };

  render() {
    const question = this.props.question as QuestionAntdDateModel;
    if (!question) return null;
    const value = question.value ? dayjs(question.value) : undefined;

    return (
      <div>
        <DatePicker
          value={value}
          onChange={this.handleChange}
          disabled={question.isReadOnly}
          placeholder={question.placeHolder || "Select date"}
          style={{ width: "100%" }}
          size="large"
        />
      </div>
    );
  }
}

// Ant Design Checkbox
export class QuestionAntdCheckboxModel extends Question {
  getType() {
    return "antd-checkbox";
  }
}

class SurveyQuestionAntdCheckbox extends SurveyQuestionElementBase {
  handleChange = (checkedValues: any[]) => {
    this.props.question.value = checkedValues;
  };

  render() {
    const question = this.props.question as QuestionAntdCheckboxModel;
    if (!question) return null;
    const options = question.choices.map((choice: any) => ({
      value: choice.value,
      label: choice.text,
    }));

    return (
      <div>
        <Checkbox.Group
          value={question.value || []}
          onChange={this.handleChange}
          disabled={question.isReadOnly}
          options={options}
        />
      </div>
    );
  }
}

// Register all custom question types
export function registerAntdQuestions() {
  // Text Input
  Serializer.addClass(
    "antd-text",
    [],
    () => new QuestionAntdTextModel(""),
    "text"
  );
  ReactQuestionFactory.Instance.registerQuestion("antd-text", (props) => {
    return createElement(SurveyQuestionAntdText, props);
  });

  // Select
  Serializer.addClass(
    "antd-select",
    [
      {
        name: "choices:itemvalues",
        category: "choices",
      },
    ],
    () => new QuestionAntdSelectModel(""),
    "dropdown"
  );
  ReactQuestionFactory.Instance.registerQuestion("antd-select", (props) => {
    return createElement(SurveyQuestionAntdSelect, props);
  });

  // Radio
  Serializer.addClass(
    "antd-radio",
    [
      {
        name: "choices:itemvalues",
        category: "choices",
      },
    ],
    () => new QuestionAntdRadioModel(""),
    "radiogroup"
  );
  ReactQuestionFactory.Instance.registerQuestion("antd-radio", (props) => {
    return createElement(SurveyQuestionAntdRadio, props);
  });

  // Rate
  Serializer.addClass(
    "antd-rate",
    [
      {
        name: "rateMax",
        default: 5,
        category: "general",
      },
    ],
    () => new QuestionAntdRateModel(""),
    "rating"
  );
  ReactQuestionFactory.Instance.registerQuestion("antd-rate", (props) => {
    return createElement(SurveyQuestionAntdRate, props);
  });

  // Date
  Serializer.addClass(
    "antd-date",
    [],
    () => new QuestionAntdDateModel(""),
    "text"
  );
  ReactQuestionFactory.Instance.registerQuestion("antd-date", (props) => {
    return createElement(SurveyQuestionAntdDate, props);
  });

  // Checkbox
  Serializer.addClass(
    "antd-checkbox",
    [
      {
        name: "choices:itemvalues",
        category: "choices",
      },
    ],
    () => new QuestionAntdCheckboxModel(""),
    "checkbox"
  );
  ReactQuestionFactory.Instance.registerQuestion("antd-checkbox", (props) => {
    return createElement(SurveyQuestionAntdCheckbox, props);
  });
}
