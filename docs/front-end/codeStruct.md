# 使用类来组织代码API的结构：结合代码生成

我们一般对接后台API的接口怎么组织呢，看了不少前端项目各种写法的都有，常见的方法有以下几种：

# 不统一管理

最简单的方法是不对API调用进行统一管理，这样在项目的各个地方都会出现API调用的代码

```typescript
const axios = require('axios');

// Make a request for a user with a given ID
axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
```

这种方式虽然简单，但在项目规模扩大后，维护起来会非常困难

# 统一管理

为了更好地组织代码，可以在项目的 `src` 目录下创建一个 `api` 目录，所有对接后台API的文件都放在这里，并使用一个对象来管理所有导出的方法

user.ts

```typescript
export function user1() {
  return axios.get('/user', {
    params: {
      ID: 12345
    }
  }) 
}

export function user2() {
  return axios.get('/user', {
    params: {
      ID: 12345
    }
  }) 
}

// 可能会统一导出
export const User  ={
  user1,
  user2
}
```

使用

```typescript
try {
 await User.user1()
} catch (error) {
console.log('%c🚀[error]-17:', 'color: #4240a3', error);
}
```

# 使用类来组织代码

在使用TS时我更习惯于使用类来管理组织代码，这样结构更清晰，也可以使用装饰器做接口权限、参数修改等处理

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240703143852.png)

```typescript
export class pspService {
  /** 成员分页列表 GET /admin/admins */
  static async AdminList(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: Models.AdminListParams,
    options?: { [key: string]: any },
  ) {
    return request<Models.Response & { data?: Models.AdminListRet }>({
      url: `/admin/admins`,
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    });
  }

  /** 成员创建 POST /admin/admins */
  static async AdminCreate(body: Models.AdminCreateArg, options?: { [key: string]: any }) {
    return request<Models.Response & { data?: Models.AdminCreateRet }>({
      url: `/admin/admins`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    });
  }
}
```

使用类来组织代码，结构和后端接口是一一对应的，你也可以在类里面写装饰器

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240703143944.png)

# 生成代码

细心的你可能发现了，这些对接接口的代码不是我一个个手写的（这种工作重复且无意义），这是我用一个脚本进行生成的，只需要后端提供一份符合OpenAPI3的swagger json就可以一键生成对接接口的代码和模型了！

可以体验一下，你会喜欢上一键生成API的快感：

[openapi-genuu](https://github.com/sharebravery/openapi-genuu)

具体的使用方法和注意事项请看这个：
[爽了！一键生成TS模型及接口方法](https://juejin.cn/post/7338704641842479167)

---

*END*

---

